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
      return {
        ...state,
        appointments: state.appointments.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      }

    case types.appointmentDeleted:
      return {
        ...state,
        appointments: state.appointments.filter(
          (e) => e.id !== state.activeAppointment.id
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
