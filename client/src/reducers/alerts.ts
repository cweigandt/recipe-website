import { AlertObjectType } from '../types/AlertTypes'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AlertType } from '../constants/AlertTypes'

let uid = 0

export type AddAlertActionType = {
  text: string
  style: AlertType
}

export type RemoveAlertActionType = {
  id: number
}

type StateType = {
  activeAlerts: AlertObjectType[]
}

const initialState: StateType = { activeAlerts: [] }

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert(state, action: PayloadAction<AddAlertActionType>) {
      state.activeAlerts.push({
        text: action.payload.text,
        style: action.payload.style,
        id: uid++,
      })
    },
    removeAlert(state, action: PayloadAction<RemoveAlertActionType>) {
      state.activeAlerts = state.activeAlerts.filter(
        (alert) => alert.id !== action.payload.id
      )
    },
  },
})

export default alertSlice
