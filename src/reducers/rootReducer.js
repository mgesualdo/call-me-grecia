import { combineReducers } from 'redux'

import { uiReducer } from './uiReducer'
import { clientReducer } from './clientReducer'
import { servicesReducer } from './servicesReducer'
import { productsReducer } from './productsReducer'
import { usersReducer } from './usersReducer'
import { reportsReducer } from './reportsReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
  ui: uiReducer,
  client: clientReducer,
  service: servicesReducer,
  product: productsReducer,
  user: usersReducer,
  auth: authReducer,
  report: reportsReducer,
})
