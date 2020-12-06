import { types } from '../types/types'

const initialState = {
  checking: false,
  loggedClient:
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('loggedClient')),
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        loggedClient: action.payload,
        checking: false,
      }

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      }

    case types.authLogout:
      return {
        checking: false,
      }

    default:
      return state
  }
}
