import { combineReducers } from 'redux'

import { uiReducer } from './uiReducer'
import { clientReducer } from './clientReducer'
import { servicesReducer } from './servicesReducer'
import { usersReducer } from './usersReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
  ui: uiReducer,
  client: clientReducer,
  service: servicesReducer,
  user: usersReducer,
  auth: authReducer,
})
