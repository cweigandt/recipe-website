const initialState = {
  allRecipes: [],
  hasFullRecipes: false,
}

var recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADED_RECIPES':
      return {
        ...state,
        allRecipes: action.recipes,
        hasFullRecipes: action.isFullRecipes,
      }

    default:
      return state
  }
}

export default recipesReducer
