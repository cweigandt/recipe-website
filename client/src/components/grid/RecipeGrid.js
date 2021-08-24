import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import GridCard from './GridCard'
import '../../styles/grid/RecipeGrid.css'

function RecipeGrid(props) {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRecipes(window.serverData.allRecipes)
  }, [])

  return (
    <div id='recipeGrid' class={recipes.length === 0 ? '' : 'loaded'}>
      {recipes
        .filter((recipe) => {
          return recipe.thumbnail && recipe.thumbnail.length > 0
        })
        .map((recipe) => {
          return <GridCard {...recipe}></GridCard>
        })}
    </div>
  )
}

GridCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
}

export default RecipeGrid
