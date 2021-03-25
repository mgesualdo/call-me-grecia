import { types } from '../types/types'

const initialState = {
  clients: [],
  selectedUser: null,
  clientAppointments: [],
}

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getClients:
      return {
        ...state,
        clients: action.payload,
      }
    case types.clientSelected:
      return {
        ...state,
        selectedClient: state.clients.find(
          (client) => client._id === action.payload
        ),
      }

    case types.clientAppointments:
      return {
        ...state,
        clientAppointments: action.payload,
      }

    default:
      return state
  }
}
