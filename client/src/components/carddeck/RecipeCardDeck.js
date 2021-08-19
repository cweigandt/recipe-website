import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import RecipeCard from './RecipeCard'
import DeckBanner from './DeckBanner'
import '../../styles/carddeck/RecipeCardDeck.css'

function RecipeCardDeck(props) {
  const [recipes, setRecipes] = useState([])
  const [visibleRecipes, setVisibleRecipes] = useState([])
  const [randomRecipe, setRandomRecipe] = useState([])

  const initializeData = (recipes) => {
    setRandomRecipe(recipes[Math.floor(Math.random() * recipes.length)])

    setRecipes(recipes)
    setVisibleRecipes(recipes)
  }

  const { filter } = props
  useEffect(() => {
    const filteredRecipes = window.serverData.allRecipes.filter((recipe) =>
      filter(recipe)
    )

    initializeData(filteredRecipes)
  }, [filter])

  function handleSearchText(searchText) {
    setVisibleRecipes(
      recipes.filter((recipe, index) => {
        if (
          recipe.name.toUpperCase().match(searchText.toUpperCase()) !== null
        ) {
          return true
        }
        return false
      })
    )

    if (visibleRecipes.length > 0) {
      setRandomRecipe(
        visibleRecipes[Math.floor(Math.random() * visibleRecipes.length)]
      )
    }
  }

  return (
    <div id='pageWrapper'>
      <DeckBanner
        onSearchText={handleSearchText}
        {...randomRecipe}
      ></DeckBanner>

      <div id='numRecipesCounter'>{visibleRecipes.length}</div>
      <div id='recipeCardDeck' class={recipes.length === 0 ? '' : 'loaded'}>
        {visibleRecipes.map((recipe) => {
          return <RecipeCard {...recipe}></RecipeCard>
        })}
      </div>
    </div>
  )
}

RecipeCardDeck.propTypes = {
  filter: PropTypes.func.isRequired,
}

export default RecipeCardDeck
