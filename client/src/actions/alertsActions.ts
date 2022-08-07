import { AlertType } from '../constants/AlertTypes'

export type AddAlertActionType = {
  type: AlertType
  text: string
  style: string
}

export type RemoveAlertActionType = {
  type: string
  id: number
}

export const addAlert = (text: string, style: string) => {
  return {
    type: 'ADD_ALERT',
    text,
    style,
  }
}

export const removeAlert = (id: number) => {
  return {
    type: 'REMOVE_ALERT',
    id,
  }
}
