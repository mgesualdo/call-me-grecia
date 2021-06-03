import { types } from '../types/types'

const initialState = {
  appointmentsPerArtist: [],
}

export const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAppointmentsPerArtistReport:
      return {
        ...state,
        appointmentsPerArtist: action.payload,
      }

    default:
      return state
  }
}
