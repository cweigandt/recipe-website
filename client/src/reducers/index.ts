import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import alerts from './alerts'
import groceries from './groceries'
import login from './login'
import modal from './modal'
import recipes from './recipes'

const reducer = combineReducers({
  alerts: alerts.reducer,
  groceries: groceries.reducer,
  login: login.reducer,
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
