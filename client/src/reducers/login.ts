import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LogInActionType = {}
export type LogOutActionType = {}
export type LoginSyncedActionType = {}

type StateType = {
  isLoggedIn: boolean
  isUpToDate: boolean
}

const initialState: StateType = {
  isLoggedIn: false,
  isUpToDate: false,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn(state, __action: PayloadAction<LogInActionType>) {
      state.isLoggedIn = true
    },
    logOut(state, __action: PayloadAction<LogOutActionType>) {
      state.isLoggedIn = false
    },
    loginSynced(state, __action: PayloadAction<LoginSyncedActionType>) {
      state.isUpToDate = true
    },
  },
})

export default loginSlice
