import React from 'react'
import PropTypes from 'prop-types'

import GridCard from './GridCard'
import '../../styles/grid/RecipeGrid.css'
import withRecipes from '../hoc/withRecipes'

function RecipeGrid({ recipes }) {
  return (
    <div id='recipeGrid' className={recipes.length === 0 ? '' : 'loaded'}>
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

export default withRecipes(RecipeGrid)
