import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { forceCheck as forceCheckLazyLoad } from 'react-lazyload'

import RecipeCard from './RecipeCard'
import DeckBanner from './DeckBanner'
import '../../styles/carddeck/RecipeCardDeck.css'
import SortBar from '../sort/SortBar'
import { sortByType, SORT_TYPES } from '../../utilities/SortUtilities'
import { withRouter } from 'react-router-dom'
import withRecipes from '../hoc/withRecipes'

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

export const RecipeCardDeck = ({ filter, history, location, recipes }) => {
  const [visibleRecipes, setVisibleRecipes] = useState([])
  const [randomRecipe, setRandomRecipe] = useState({
    name: '',
    imageLocation: '',
  })
  const [hasLoaded, setHasLoaded] = useState(false)
  const [sortType, setSortType] = useState(SORT_TYPES.UPLOAD)
  const searchParams = new URLSearchParams(location.search)
  const [initialSearchText, setInitialSearchText] = useState(
    searchParams.get('search') || ''
  )

  const updateRecipesOnSearch = useCallback(
    (searchText, allRecipes) => {
      let newVisibleRecipes = allRecipes.filter((recipe, index) => {
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

      setTimeout(forceCheckLazyLoad, 300)
    },
    [sortType]
  )

  const initializeData = useCallback(
    (recipes) => {
      setRandomRecipe(chooseRandomRecipe(recipes))

      setVisibleRecipes(recipes)

      if (initialSearchText !== '') {
        updateRecipesOnSearch(initialSearchText, recipes)
      }
      setHasLoaded(true)
    },
    [initialSearchText, updateRecipesOnSearch]
  )

  useEffect(() => {
    if (hasLoaded || recipes.length === 0) {
      return
    }

    const filteredRecipes = filter
      ? recipes.filter((recipe) => filter(recipe))
      : recipes

    initializeData(filteredRecipes)
  }, [hasLoaded, filter, initializeData, recipes])

  const handleSearchText = useCallback(
    (searchText) => {
      setInitialSearchText('')

      updateRecipesOnSearch(searchText, recipes)

      let searchValue = `?search=${searchText}`
      if (searchText === '') {
        searchValue = undefined
      }
      history.push({
        search: searchValue,
      })
    },
    [history, recipes, updateRecipesOnSearch]
  )

  const handleSortChange = useCallback(
    (type) => {
      setSortType(type)

      if (visibleRecipes.length > 1) {
        const newVisibleRecipes = sortByType(type, visibleRecipes)
        setVisibleRecipes(newVisibleRecipes)
        setTimeout(forceCheckLazyLoad, 300)
      }
    },
    [visibleRecipes]
  )

  if (recipes.length === 0) {
    return null // TODO loading
  }

  return (
    <div id='pageWrapper'>
      <DeckBanner
        onSearchText={handleSearchText}
        initialSearchText={initialSearchText}
        {...randomRecipe}
      ></DeckBanner>

      <div id='numRecipesCounter' data-test-id='recipe-counter'>
        {visibleRecipes.length}
      </div>
      <SortBar selectedType={sortType} onSortChange={handleSortChange} />
      <div id='recipeCardDeck'>
        {visibleRecipes.map((recipe) => {
          return <RecipeCard key={recipe.name} {...recipe} />
        })}
      </div>
    </div>
  )
}

RecipeCardDeck.propTypes = {
  filter: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(withRecipes(RecipeCardDeck))
