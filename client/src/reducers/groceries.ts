import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FullRecipe } from '../types/RecipeTypes'

export type StartShoppingActionType = {}

export type AddToCart = {
  recipe: FullRecipe
}

type StateType = {
  isShopping: boolean
  cart: FullRecipe[]
}

const initialState: StateType = { isShopping: false, cart: [] }

const alertSlice = createSlice({
  name: 'groceries',
  initialState,
  reducers: {
    startShopping(state, action: PayloadAction<StartShoppingActionType>) {
      state.isShopping = true
    },
    addToCart(state, action: PayloadAction<AddToCart>) {
      state.cart.push(action.payload.recipe)
    },
  },
})

export default alertSlice
