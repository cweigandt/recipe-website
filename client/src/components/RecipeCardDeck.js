import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import RecipeCard from './RecipeCard'
import DeckBanner from './DeckBanner'
import '../styles/RecipeCardDeck.css'

function RecipeCardDeck(props) {
  const [recipes, setRecipes] = useState([])
  const [visibleRecipes, setVisibleRecipes] = useState([])
  const [randomRecipe, setRandomRecipe] = useState([])

  const initializeData = (recipes) => {
    setRecipes(recipes)
    setVisibleRecipes(recipes)
    setRandomRecipe(recipes[Math.floor(Math.random() * recipes.length)])
  }

  useEffect(() => {
    fetch(props.requestURL)
      .then((response) => response.json())
      .then((data) => {
        initializeData(data)
      })
  }, [props.requestURL])

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
  requestURL: PropTypes.string.isRequired,
}

export default RecipeCardDeck
