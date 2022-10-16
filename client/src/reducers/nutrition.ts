import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NutritionInfo } from '../types/Nutrition'

export type SaveNutrition = {
  recipeName: string
  nutrition: NutritionInfo
}

type StateType = {
  nutritionMap: { [recipeName: string]: NutritionInfo }
}

const initialState: StateType = { nutritionMap: {} }

const alertSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    saveNutrition(state, action: PayloadAction<SaveNutrition>) {
      state.nutritionMap[action.payload.recipeName] = action.payload.nutrition
    },
  },
})

export default alertSlice
