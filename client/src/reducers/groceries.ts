import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FullRecipe, IngredientType } from '../types/RecipeTypes'

export type StartShoppingActionType = {}

export type AddToCart = {
  recipe: FullRecipe
  ingredientType: IngredientType
}

export type RemoveFromCart = {
  recipe: FullRecipe
}

export type RemoveIngredientFromCart = {
  recipe: FullRecipe
  ingredientType: IngredientType
}

type StateType = {
  isShopping: boolean
  cart: {
    [recipeName: string]: {
      recipe: FullRecipe
      ingredientTypes: IngredientType[]
    }
  }
}

const initialState: StateType = {
  isShopping: false,
  cart: {},
}

const alertSlice = createSlice({
  name: 'groceries',
  initialState,
  reducers: {
    startShopping(state, action: PayloadAction<StartShoppingActionType>) {
      state.isShopping = true
    },
    addToCart(state, action: PayloadAction<AddToCart>) {
      const existing = state.cart[action.payload.recipe.name] || {
        ingredientTypes: [],
      }
      state.cart[action.payload.recipe.name] = {
        recipe: action.payload.recipe,
        ingredientTypes: [
          ...existing.ingredientTypes,
          action.payload.ingredientType,
        ],
      }
    },
    removeFromCart(state, action: PayloadAction<RemoveFromCart>) {
      delete state.cart[action.payload.recipe.name]
    },
    removeIngredientsFromCart(
      state,
      action: PayloadAction<RemoveIngredientFromCart>
    ) {
      state.cart[action.payload.recipe.name].ingredientTypes = state.cart[
        action.payload.recipe.name
      ].ingredientTypes.filter((ing) => {
        return ing !== action.payload.ingredientType
      })

      if (state.cart[action.payload.recipe.name].ingredientTypes.length === 0) {
        delete state.cart[action.payload.recipe.name]
      }
    },
  },
})

export default alertSlice
