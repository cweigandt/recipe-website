import {
  AddAlertActionType,
  RemoveAlertActionType,
} from '../actions/alertsActions'
import { AlertObjectType } from '../types/AlertTypes'

let uid = 0

type StateType = AlertObjectType[]

export type AlertActionType = AddAlertActionType | RemoveAlertActionType

var alertsReducer = (state: StateType = [], action: AlertActionType) => {
  switch (action.type) {
    case 'ADD_ALERT':
      // TODO - use createSlice
      const addAction = action as unknown as AddAlertActionType
      return [
        ...state,
        {
          text: addAction.text,
          style: addAction.style,
          id: uid++,
        },
      ]

    case 'REMOVE_ALERT':
      const removeAction = action as RemoveAlertActionType
      return state.filter((alert) => alert.id !== removeAction.id)

    default:
      return state
  }
}

export default alertsReducer
