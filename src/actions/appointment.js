import Swal from 'sweetalert2'

import { types } from '../types/types'
import { fetchSinToken } from '../helpers/fetch'
import { getUserAppointments } from '../actions/users'
import { uiCloseModal, uiLoading, uiLoadingGoingToMercadoPago } from './ui'
import { getClientAppointments } from './client'

export const appointmentStartAddNew = (appointment) => {
  return async (dispatch, getState) => {
    const { loggedClient, loggedUser } = getState().auth
    if (appointment.createdByClient) {
      appointment.client = loggedClient._id
    }

    try {
      dispatch(uiLoadingGoingToMercadoPago(true))
      dispatch(uiLoading(true))

      console.log({
        isValid: appointment.isValid,
        cancelled: appointment.cancelled,
      })
      const resp = await fetchSinToken('appointment', appointment, 'POST')
      const body = await resp.json()

      if (appointment.createdByClient && body.ok) {
        const resp2 = await fetchSinToken(
          'mercadopago',
          body.addedAppointment,
          'PUT'
        )
        const { url } = await resp2.json()

        window.location = url
        dispatch(getUserAppointments(body.addedAppointment.artist))
      } else if (!body.ok && body.error.code === 11000) {
        dispatch(getUserAppointments(appointment.artist))
        Swal.fire('Lo sentimos!', 'Ese turno ya no está disponible!', 'info')
      }
      dispatch(uiLoadingGoingToMercadoPago(false))
      dispatch(uiLoading(false))
      dispatch(uiCloseModal())
      if (!!loggedUser) dispatch(getUserAppointments(loggedUser._id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const appointmentSetActive = (appointment) => ({
  type: types.appointmentSetActive,
  payload: appointment,
})

export const clearActiveAppointment = () => ({
  type: types.clearActiveAppointment,
})

export const appointmentStartUpdate = (
  appointment,
  appointmentId,
  isUser = false
) => {
  return async (dispatch, getState) => {
    const { loggedClient } = getState().client

    if (!isUser) {
      appointment.client = loggedClient._id
    }
    dispatch(uiLoading(true))

    try {
      const resp = await fetchSinToken(
        `appointment/${appointmentId}`,
        appointment,
        'PUT'
      )
      const body = await resp.json()
      const updatedAppointment = body.appointment

      console.log({ updatedAppointment })

      if (body.ok) {
        dispatch(getUserAppointments(updatedAppointment.artist._id))
        dispatch(appointmentSetActive(updatedAppointment))
        Swal.fire('Listo!', 'Turno actualizado con éxito!', 'success')
      } else {
        console.log(body)
        Swal.fire('Error', 'Algo falló!', 'error')
      }
    } catch (error) {
      console.log(error)
    }
    dispatch(uiLoading(false))
    dispatch(uiCloseModal())
  }
}

export const appointmentStartCancelation = (appointment) => {
  return async (dispatch, getState) => {
    const { loggedUser, loggedClient } = getState().auth
    try {
      dispatch(uiLoading(true))
      const resp = await fetchSinToken(
        `appointment/${appointment._id}`,
        { userId: loggedUser?._id, clientId: loggedClient?._id },
        'DELETE'
      )
      const body = await resp.json()

      if (body.ok) {
        dispatch(getClientAppointments(appointment.client))
        Swal.fire('Listo!', 'Turno cancelado con éxito', 'success')
      } else {
        console.log(body)
        Swal.fire('Error', body.msg, 'error')
      }
      dispatch(uiLoading(true))
    } catch (error) {
      console.log(error)
    }
  }
}

export const appointmentLogout = () => ({ type: types.appointmentLogout })
