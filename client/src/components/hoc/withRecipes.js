import { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadedRecipes } from '../../actions/recipeActions'

const withRecipes = (WrappedComponent, useFullRecipes) => {
  return connect((state) => ({
    recipes: state.recipes.allRecipes,
    hasFullRecipes: state.recipes.hasFullRecipes,
  }))((props) => {
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
