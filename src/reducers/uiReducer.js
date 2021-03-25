import { types } from '../types/types'

const initialState = {
  refreshImage: new Date().getTime(),
  modalOpen: false,
  loading: false,
  loadingUpdatingClient: false,
  loadingRegister: false,
  loadingLogin: false,
  loadingClients: false,
  loadingChangingPassword: false,
  loadingGoingToMercadoPago: false,
  loadingDeleting: false,
  idBeingDeleted: null,
}

export const uiReducer = (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
    case types.uiRefreshImage:
      return {
        ...state,
        refreshImage: new Date().getTime(),
      }
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      }

    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      }
    case types.uiLoading:
      return {
        ...state,
        loading: action.payload,
      }
    case types.uiLoadingUpdatingClient:
      return {
        ...state,
        loadingUpdatingClient: action.payload,
      }
    case types.uiLoadingRegister:
      return {
        ...state,
        loadingRegister: action.payload,
      }
    case types.uiLoadingLogin:
      return {
        ...state,
        loadingLogin: action.payload,
      }
    case types.uiLoadingClients:
      return {
        ...state,
        loadingClients: action.payload,
      }
    case types.uiLoadingChangingPassword:
      return {
        ...state,
        loadingChangingPassword: action.payload,
      }
    case types.uiLoadingGoingToMercadoPago:
      return {
        ...state,
        loadingGoingToMercadoPago: action.payload,
      }

    case types.uiLoadingDeleting:
      return {
        ...state,
        loadingDeleting: action.payload.value,
        idBeingDeleted: action.payload.idBeingDeleted,
      }
    default:
      return state
  }
}
