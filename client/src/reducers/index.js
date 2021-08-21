import { combineReducers } from 'redux'

import alertsReducer from './alertsReducer'
import loginReducer from './loginReducer'
import modalReducer from './modalReducer'

export default combineReducers({
  alerts: alertsReducer,
  login: loginReducer,
  modal: modalReducer,
})
