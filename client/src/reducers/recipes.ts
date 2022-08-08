import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PartialRecipe, FullRecipe } from '../types/RecipeTypes'

export type LoadedRecipesActionType = {
  recipes: PartialRecipe[] | FullRecipe[]
  isFullRecipes: boolean
}

type StateType = {
  allRecipes: PartialRecipe[] | FullRecipe[]
  hasFullRecipes: boolean
}

const initialState: StateType = {
  allRecipes: [],
  hasFullRecipes: false,
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    loadedRecipes(state, action: PayloadAction<LoadedRecipesActionType>) {
      state.allRecipes = action.payload.recipes
      state.hasFullRecipes = action.payload.isFullRecipes
    },
  },
})

export default recipesSlice
