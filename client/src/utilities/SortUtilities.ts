import { PartialRecipe } from '../types/RecipeTypes'
import { SORT_TYPES } from '../constants/SortTypes'

const sortByUpload = (recipes: PartialRecipe[]) => {
  return [...recipes].sort((a, b) => {
    return b.uploadTime - a.uploadTime
  })
}

const sortByVisits = (recipes: PartialRecipe[]) => {
  return [...recipes].sort((a, b) => {
    return b.visits - a.visits
  })
}

const sortByCookedDate = (recipes: PartialRecipe[]) => {
  return [...recipes].sort((a, b) => {
    const aCooked = a.cookedDates || []
    const bCooked = b.cookedDates || []

    if (aCooked.length === 0 && bCooked.length === 0) {
      return 0
    }

    if (aCooked.length === 0 && bCooked.length > 0) {
      return 1
    }

    if (aCooked.length > 0 && bCooked.length === 0) {
      return -1
    }

    return bCooked[0] - aCooked[0]
  })
}

export const sortByType = (
  type: typeof SORT_TYPES[keyof typeof SORT_TYPES],
  recipes: PartialRecipe[]
) => {
  switch (type) {
    case SORT_TYPES.UPLOAD:
      return sortByUpload(recipes)
    case SORT_TYPES.VISITS:
      return sortByVisits(recipes)
    case SORT_TYPES.COOKED_DATES:
      return sortByCookedDate(recipes)
    default:
      return recipes
  }
}
