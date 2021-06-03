import { types } from '../types/types'
import { emptyUser } from '../utils/constants'

const initialState = {
  users: [],
  selectedUser: null,
  userAppointments: [],
  activeAppointment:
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('activeAppointment')),
  userToCreateUpdate: emptyUser,
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getUsers:
      return {
        ...state,
        users: action.payload,
      }
    case types.userSelected:
      return {
        ...state,
        selectedUser: state.users.find((user) => user._id === action.payload),
      }
    case types.userAppointments:
      return {
        ...state,
        userAppointments: action.payload,
      }

    case types.appointmentSetActive:
      return {
        ...state,
        activeAppointment: action.payload,
      }

    case types.clearActiveAppointment:
      return {
        ...state,
        activeAppointment: null,
      }

    case types.appointmentDeleted:
      return {
        ...state,
        userAppointments: state.userAppointments.filter(
          (a) => a._id !== state.activeAppointment._id
        ),
        activeAppointment: null,
      }

    default:
      return state
  }
}
