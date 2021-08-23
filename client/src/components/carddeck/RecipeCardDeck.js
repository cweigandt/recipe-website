import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import RecipeCard from './RecipeCard'
import DeckBanner from './DeckBanner'
import '../../styles/carddeck/RecipeCardDeck.css'

const chooseRandomRecipe = (recipes) => {
  // Loop 3 times trying to find a recipe with an image
  let iter = 0
  let randomRecipe = { imageLocation: '' }
  while (recipes.length && !randomRecipe.imageLocation && iter < 3) {
    randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
    iter++
  }
  return randomRecipe
}

const RecipeCardDeck = ({ filter }) => {
  const [recipes, setRecipes] = useState([])
  const [visibleRecipes, setVisibleRecipes] = useState([])
  const [randomRecipe, setRandomRecipe] = useState([])

  const initializeData = useCallback((recipes) => {
    setRandomRecipe(chooseRandomRecipe(recipes))

    setRecipes(recipes)
    setVisibleRecipes(recipes)
  }, [])

  useEffect(() => {
    const filteredRecipes = window.serverData.allRecipes.filter((recipe) =>
      filter(recipe)
    )

    initializeData(filteredRecipes)
  }, [filter, initializeData])

  const handleSearchText = useCallback(
    (searchText) => {
      setVisibleRecipes(
        recipes.filter((recipe, index) => {
          return (
            recipe.name.toUpperCase().match(searchText.toUpperCase()) !==
              null ||
            recipe.tags.some(
              (tag) =>
                tag.toUpperCase().match(searchText.toUpperCase()) !== null
            )
          )
        })
      )

      if (visibleRecipes.length > 0) {
        setRandomRecipe(chooseRandomRecipe(visibleRecipes))
      }
    },
    [recipes, visibleRecipes]
  )

  return (
    <div id='pageWrapper'>
      <DeckBanner
        onSearchText={handleSearchText}
        {...randomRecipe}
      ></DeckBanner>

      <div id='numRecipesCounter' data-test-id='recipe-counter'>
        {visibleRecipes.length}
      </div>
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

RecipeCardDeck.defaultProps = {
  filter: () => true,
}

export default RecipeCardDeck
