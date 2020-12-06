import { types } from '../types/types'

const initialState = {
  appointments: [],
  activeAppointment: null,
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.appointmentSetActive:
      return {
        ...state,
        activeAppointment: action.payload,
      }

    case types.appointmentAddNew:
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      }

    case types.clearActiveAppointment:
      return {
        ...state,
        activeAppointment: null,
      }

    case types.appointmentUpdated:
      console.log(action.payload)
      console.log(state.appointments)
      return {
        ...state,
        appointments: state.appointments.map((appointment) => {
          if (appointment._id === action.payload._id) {
            return action.payload
          } else {
            return appointment
          }
        }),
      }

    case types.appointmentDeleted:
      return {
        ...state,
        appointments: state.appointments.filter(
          (a) => a._id !== state.activeAppointment._id
        ),
        activeAppointment: null,
      }

    case types.appointmentLoaded:
      return {
        ...state,
        appointments: [...action.payload],
      }

    case types.appointmentLogout:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
