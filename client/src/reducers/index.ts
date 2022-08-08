import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import alerts from './alerts'
import loginReducer from './loginReducer'
import modal from './modal'
import recipes from './recipes'

const reducer = combineReducers({
  alerts: alerts.reducer,
  login: loginReducer,
  modal: modal.reducer,
  recipes: recipes.reducer,
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
