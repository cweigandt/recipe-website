import { PartialRecipe } from '../types/RecipeTypes'

export const getAllTags = (recipes: PartialRecipe[]) => {
  let allTags: string[] = []
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      if (!allTags.find((t) => t === tag)) {
        allTags.push(tag)
      }
    })
  })

  return allTags
}

export const getAllTagCounts = (recipes: PartialRecipe[]) => {
  let allTags: { [key: string]: number } = {}
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      allTags[tag] = allTags[tag] !== undefined ? allTags[tag] + 1 : 1
    })
  })

  return allTags
}
