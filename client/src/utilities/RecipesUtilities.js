export const getAllTags = (optionalRecipes) => {
  let recipes = optionalRecipes || window.serverData.allRecipes
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

export const getAllTagCounts = (optionalRecipes) => {
  let recipes = optionalRecipes || window.serverData.allRecipes
  let allTags = {}
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      allTags[tag] = allTags[tag] !== undefined ? allTags[tag] + 1 : 1
    })
  })

  return allTags
}
