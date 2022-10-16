export type ExtendedIngredient = {
  aisle: string
  name: string
  originalName: string
}

export type NutritionInfo = {
  extendedIngredients?: ExtendedIngredient[]
  pricePerServing?: number
  vegetarian?: boolean
  vegan?: boolean
  dairyFree?: boolean
  glutenFree?: boolean
  error?: string
}
