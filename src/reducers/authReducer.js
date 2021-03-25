import { types } from '../types/types'

const initialState = {
  loggedUser:
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('loggedUser')),
  loggedClient:
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('loggedClient')),
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userLogin:
      return {
        ...state,
        loggedClient: null,
        loggedUser: action.payload,
      }
    case types.userLogout:
      return {
        ...state,
        loggedUser: null,
      }
    case types.clientLogin:
      return {
        ...state,
        loggedUser: null,
        loggedClient: action.payload,
      }

    case types.clientLogout:
      return {
        ...state,
        loggedClient: null,
      }

    default:
      return state
  }
}
