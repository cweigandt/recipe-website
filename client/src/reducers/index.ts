import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import alertsReducer from './alertsReducer'
import loginReducer from './loginReducer'
import modalReducer from './modalReducer'
import recipesReducer from './recipesReducer'

const reducer = combineReducers({
  alerts: alertsReducer,
  login: loginReducer,
  modal: modalReducer,
  recipes: recipesReducer,
})

const store = configureStore({
  reducer,
  devTools:
    // @ts-expect-error window extension
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // @ts-expect-error window extension
    window.__REDUX_DEVTOOLS_EXTENSION__(),
})

export type RootState = ReturnType<typeof store.getState>

export default store
