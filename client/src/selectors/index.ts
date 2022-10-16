import { RootState } from '../reducers'

export const nutrition = (recipeName: string) => (state: RootState) =>
  state.nutrition.nutritionMap[recipeName]

export const allNutrition = (state: RootState) => state.nutrition.nutritionMap

export const isShoppingSelector = (state: RootState) =>
  state.groceries.isShopping

export const cartSelector = (state: RootState) => state.groceries.cart
