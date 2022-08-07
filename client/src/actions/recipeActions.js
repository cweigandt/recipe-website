export const loadedRecipes = (recipes, isFullRecipes) => {
  return {
    type: 'LOADED_RECIPES',
    recipes,
    isFullRecipes,
  }
}
