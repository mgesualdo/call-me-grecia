import { types } from '../types/types'

const initialState = {
  services: [],
  selectedService: null,
}

export const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getServices:
      return {
        ...state,
        services: action.payload,
      }
    case types.serviceSelected:
      return {
        ...state,
        selectedService: state.services.find(
          (service) => service._id === action.payload
        ),
      }

    default:
      return state
  }
}
