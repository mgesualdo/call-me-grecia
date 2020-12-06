import Swal from 'sweetalert2'

import { types } from '../types/types'
import { fetchSinToken } from '../helpers/fetch'
import {
  prepareAppointments,
  prepareAppointment,
} from '../helpers/prepareAppointments'

export const appointmentStartAddNew = (appointment) => {
  return async (dispatch, getState) => {
    const { loggedClient } = getState().auth

    appointment.client = loggedClient._id

    try {
      const resp = await fetchSinToken('appointment', appointment, 'POST')
      const body = await resp.json()

      if (body.ok) {
        dispatch(appointmentAddNew(appointment))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const appointmentAddNew = (appointment) => ({
  type: types.appointmentAddNew,
  payload: appointment,
})

export const appointmentSetActive = (appointment) => ({
  type: types.appointmentSetActive,
  payload: appointment,
})

export const clearActiveAppointment = () => ({
  type: types.clearActiveAppointment,
})

export const appointmentStartUpdate = (appointment, appointmentId) => {
  return async (dispatch, getState) => {
    const { loggedClient } = getState().auth

    appointment.client = loggedClient._id

    console.log(appointment)
    try {
      const resp = await fetchSinToken(
        `appointment/${appointmentId}`,
        appointment,
        'PUT'
      )
      const body = await resp.json()
      const { updatedAppointment } = body

      if (body.ok) {
        dispatch(appointmentUpdated(prepareAppointment(updatedAppointment)))
      } else {
        console.log(body)
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const appointmentUpdated = (appointment) => ({
  type: types.appointmentUpdated,
  payload: appointment,
})

export const appointmentStartDelete = () => {
  return async (dispatch, getState) => {
    const { _id } = getState().calendar.activeAppointment
    try {
      const resp = await fetchSinToken(`appointment/${_id}`, {}, 'DELETE')
      const body = await resp.json()

      if (body.ok) {
        dispatch(appointmentDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const appointmentDeleted = () => ({ type: types.appointmentDeleted })

export const appointmentStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken('appointment')
      const body = await resp.json()

      const appointments = prepareAppointments(body.appointments)
      dispatch(appointmentLoaded(appointments))
      dispatch(appointmentStartLoading())
    } catch (error) {
      console.log(error)
    }
  }
}

const appointmentLoaded = (appointments) => ({
  type: types.appointmentLoaded,
  payload: appointments,
})

export const appointmentLogout = () => ({ type: types.appointmentLogout })
