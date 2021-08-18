import { combineReducers } from 'redux'

import alertsReducer from './alertsReducer'
import modalReducer from './modalReducer'

export default combineReducers({
  alerts: alertsReducer,
  modal: modalReducer,
})
