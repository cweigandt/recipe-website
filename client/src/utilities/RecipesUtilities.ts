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

export const convertURLLinks = (str: string) => {
  var expression =
    /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*))/gi
  return str.replace(expression, `<a href="$1" target="_blank">$1</a>`)
}
