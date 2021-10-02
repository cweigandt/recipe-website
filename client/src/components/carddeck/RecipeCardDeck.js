import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import RecipeCard from './RecipeCard'
import DeckBanner from './DeckBanner'
import '../../styles/carddeck/RecipeCardDeck.css'
import SortBar from '../sort/SortBar'
import { sortByType, SORT_TYPES } from '../../utilities/SortUtilities'

const chooseRandomRecipe = (recipes) => {
  // Loop 3 times trying to find a recipe with an image
  let iter = 0
  let randomRecipe = { name: '', imageLocation: '' }
  while (recipes.length && !randomRecipe.imageLocation && iter < 3) {
    randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
    iter++
  }
  return randomRecipe
}

const RecipeCardDeck = ({ filter, optionalRecipes }) => {
  const [recipes, setRecipes] = useState(optionalRecipes || [])
  const [visibleRecipes, setVisibleRecipes] = useState(optionalRecipes || [])
  const [randomRecipe, setRandomRecipe] = useState({
    name: '',
    imageLocation: '',
  })
  const [sortType, setSortType] = useState(SORT_TYPES.UPLOAD)

  const initializeData = useCallback((recipes) => {
    setRandomRecipe(chooseRandomRecipe(recipes))

    setRecipes(recipes)
    setVisibleRecipes(recipes)
  }, [])

  useEffect(() => {
    const filteredRecipes =
      optionalRecipes ||
      window.serverData.allRecipes.filter((recipe) => filter(recipe))

    initializeData(filteredRecipes)
  }, [filter, initializeData, optionalRecipes])

  const handleSearchText = useCallback(
    (searchText) => {
      let newVisibleRecipes = recipes.filter((recipe, index) => {
        return (
          recipe.name.toUpperCase().match(searchText.toUpperCase()) !== null ||
          recipe.tags.some(
            (tag) => tag.toUpperCase().match(searchText.toUpperCase()) !== null
          )
        )
      })

      newVisibleRecipes = sortByType(sortType, newVisibleRecipes)
      setVisibleRecipes(newVisibleRecipes)

      if (newVisibleRecipes.length > 0) {
        setRandomRecipe(chooseRandomRecipe(newVisibleRecipes))
      }
    },
    [recipes, sortType]
  )

  const handleSortChange = useCallback(
    (type) => {
      setSortType(type)

      if (visibleRecipes.length > 1) {
        const newVisibleRecipes = sortByType(type, visibleRecipes)
        setVisibleRecipes(newVisibleRecipes)
      }
    },
    [visibleRecipes]
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
      <SortBar selectedType={sortType} onSortChange={handleSortChange} />
      <div id='recipeCardDeck' className={recipes.length === 0 ? '' : 'loaded'}>
        {visibleRecipes.map((recipe) => {
          return <RecipeCard key={recipe.name} {...recipe}></RecipeCard>
        })}
      </div>
    </div>
  )
}

RecipeCardDeck.propTypes = {
  filter: PropTypes.func.isRequired,
  optionalRecipes: PropTypes.array,
}

RecipeCardDeck.defaultProps = {
  filter: () => true,
}

export default RecipeCardDeck
