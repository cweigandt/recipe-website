import { combineReducers } from 'redux'

import alertsReducer from './alertsReducer'
import loginReducer from './loginReducer'
import modalReducer from './modalReducer'
import recipesReducer from './recipesReducer'

export default combineReducers({
  alerts: alertsReducer,
  login: loginReducer,
  modal: modalReducer,
  recipes: recipesReducer,
})
