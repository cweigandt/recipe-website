import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { loadedRecipes } from '../../actions/recipeActions'
import { RootState } from '../../reducers'
import { FullRecipe, PartialRecipe } from '../../types/RecipeTypes'

type Props = {
  dispatch: Dispatch
  recipes: PartialRecipe[] | FullRecipe[]
  hasFullRecipes: boolean
}

const withRecipes = (
  WrappedComponent: React.FC<any>,
  useFullRecipes = false
) => {
  return connect((state: RootState) => ({
    recipes: state.recipes.allRecipes,
    hasFullRecipes: state.recipes.hasFullRecipes,
  }))((props: Props) => {
    const { dispatch, recipes, hasFullRecipes } = props

    useEffect(() => {
      const endpoint = useFullRecipes
        ? '/request/all-full-recipes'
        : '/request/all-recipes'

      if (recipes.length === 0) {
        fetch(endpoint)
          .then((response) => response.json())
          .then((data) => {
            dispatch(loadedRecipes(data, useFullRecipes))
          })
      } else if (useFullRecipes && !hasFullRecipes) {
        fetch(endpoint)
          .then((response) => response.json())
          .then((data) => {
            dispatch(loadedRecipes(data, true))
          })
      }
    }, [dispatch, hasFullRecipes, recipes])

    return <WrappedComponent {...props} />
  })
}

export default withRecipes
