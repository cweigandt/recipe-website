export const getAllTags = () => {
  let recipes = window.serverData.allRecipes
  let allTags = []
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      if (!allTags.find((t) => t === tag)) {
        allTags.push(tag)
      }
    })
  })

  return allTags
}
