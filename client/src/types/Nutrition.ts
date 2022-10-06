export type NutritionInfo = {
  extendedIngredients?: { aisle: string; originalName: string }[]
  pricePerServing?: number
  vegetarian?: boolean
  vegan?: boolean
  dairyFree?: boolean
  glutenFree?: boolean
  error?: string
}
