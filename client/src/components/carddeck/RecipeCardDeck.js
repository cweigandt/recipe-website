import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { forceCheck as forceCheckLazyLoad } from 'react-lazyload'

import RecipeCard from './RecipeCard'
import DeckBanner from './DeckBanner'
import '../../styles/carddeck/RecipeCardDeck.css'
import SortBar from '../sort/SortBar'
import { sortByType, SORT_TYPES } from '../../utilities/SortUtilities'
import { withRouter } from 'react-router-dom'

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

const RecipeCardDeck = ({ filter, history, location, optionalRecipes }) => {
  const [recipes, setRecipes] = useState(optionalRecipes || [])
  const [visibleRecipes, setVisibleRecipes] = useState(optionalRecipes || [])
  const [randomRecipe, setRandomRecipe] = useState({
    name: '',
    imageLocation: '',
  })
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

      setRecipes(recipes)
      setVisibleRecipes(recipes)

      if (initialSearchText !== '') {
        updateRecipesOnSearch(initialSearchText, recipes)
      }
    },
    [initialSearchText, updateRecipesOnSearch]
  )

  useEffect(() => {
    const filteredRecipes = (
      optionalRecipes || window.serverData.allRecipes
    ).filter((recipe) => filter(recipe))

    initializeData(filteredRecipes)
  }, [filter, initializeData, optionalRecipes])

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
  filter: PropTypes.func.isRequired,
  optionalRecipes: PropTypes.array,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

RecipeCardDeck.defaultProps = {
  filter: () => true,
}

export default withRouter(RecipeCardDeck)
