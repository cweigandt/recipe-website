export const getAllTags = (recipes) => {
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

export const getAllTagCounts = (recipes) => {
  let allTags = {}
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      allTags[tag] = allTags[tag] !== undefined ? allTags[tag] + 1 : 1
    })
  })

  return allTags
}
