import { types } from '../types/types'

export const uiRefreshImage = () => ({ type: types.uiRefreshImage })
export const uiOpenModal = () => ({ type: types.uiOpenModal })
export const uiCloseModal = () => ({ type: types.uiCloseModal })
export const uiLoading = (value) => ({ type: types.uiLoading, payload: value })
export const uiLoadingUpdatingClient = (value) => ({
  type: types.uiLoadingUpdatingClient,
  payload: value,
})
export const uiLoadingRegister = (value) => ({
  type: types.uiLoadingRegister,
  payload: value,
})
export const uiLoadingLogin = (value) => ({
  type: types.uiLoadingLogin,
  payload: value,
})
export const uiLoadingClients = (value) => ({
  type: types.uiLoadingClients,
  payload: value,
})
export const uiLoadingChangingPassword = (value) => ({
  type: types.uiLoadingChangingPassword,
  payload: value,
})
export const uiLoadingGoingToMercadoPago = (value) => ({
  type: types.uiLoadingGoingToMercadoPago,
  payload: value,
})
export const uiLoadingDeleting = ({ value, idBeingDeleted }) => ({
  type: types.uiLoadingDeleting,
  payload: { value, idBeingDeleted },
})
