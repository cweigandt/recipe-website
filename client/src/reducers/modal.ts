import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalType } from '../constants/ModalTypes'

let uid = 0

export type ShowModalActionType = {
  modal: ModalType
  id: number
  additionalText?: string
}

export type HideModalActionType = {}

export type ConfirmAreYouSureActionType = {
  id: number
}

type StateType = {
  modal?: ModalType
  id?: number
  additionalText?: string
  confirmedAreYouSureIds: number[]
}

const initialState: StateType = {
  confirmedAreYouSureIds: [],
}

export const generateUniqueId = () => uid++

const modalSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ShowModalActionType>) {
      state.modal = action.payload.modal
      state.id = action.payload.id
      state.additionalText = action.payload.additionalText
    },
    hideModal(state, __action: PayloadAction<HideModalActionType>) {
      return {
        confirmedAreYouSureIds: state.confirmedAreYouSureIds,
      }
    },
    confirmAreYouSure(
      state,
      action: PayloadAction<ConfirmAreYouSureActionType>
    ) {
      state.confirmedAreYouSureIds.push(action.payload.id)
    },
  },
})

export default modalSlice
