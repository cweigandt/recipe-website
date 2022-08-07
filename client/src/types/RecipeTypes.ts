import { Datenum } from './Aliases'

export interface PartialRecipe {
  name: string
  section: string
  tags: string[]
  thumbnail: string
  imageLocation: string
  uploadTime: Datenum
  visits: number
  cookedDates: Datenum[]
}

export interface FullRecipe extends PartialRecipe {
  servings: string
  time: string
  ingredients: string[]
  subIngredients1Name: string
  subIngredients1: string[]
  subIngredients2Name: string
  subIngredients2: string[]
  steps: string[]
  uploader: string
}
