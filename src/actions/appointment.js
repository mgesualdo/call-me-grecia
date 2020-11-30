import Swal from 'sweetalert2'

import { types } from '../types/types'
import { fetchSinToken } from '../helpers/fetch'
import { prepareAppointments } from '../helpers/prepareAppointments'

export const appointmentStartAddNew = (appointment) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth

    try {
      const resp = await fetchSinToken('appointment', appointment, 'POST')
      const body = await resp.json()

      console.log(body)

      if (body.ok) {
        appointment.id = body.appointmento.id
        appointment.user = {
          _id: uid,
          name: name,
        }
        console.log(appointment)
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

export const appointmentStartUpdate = (appointment) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        `appointments/${appointment.id}`,
        appointment,
        'PUT'
      )
      const body = await resp.json()

      if (body.ok) {
        dispatch(appointmentUpdated(appointment))
      } else {
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
    const { id } = getState().calendar.activeAppointment
    try {
      const resp = await fetchSinToken(`appointments/${id}`, {}, 'DELETE')
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
