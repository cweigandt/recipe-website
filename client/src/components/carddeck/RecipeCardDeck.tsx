import { useCallback, useEffect, useState } from 'react'
import { forceCheck as forceCheckLazyLoad } from 'react-lazyload'
import { RouteComponentProps } from 'react-router-dom'

import RecipeCard from './RecipeCard'
import DeckBanner from './DeckBanner'
import '../../styles/carddeck/RecipeCardDeck.css'
import SortBar from '../sort/SortBar'
import { sortByType } from '../../utilities/SortUtilities'
import { SortType, SORT_TYPES } from '../../constants/SortTypes'
import { withRouter } from 'react-router-dom'
import withRecipes from '../hoc/withRecipes'
import { PartialRecipe } from '../../types/RecipeTypes'

const chooseRandomRecipe = (recipes: PartialRecipe[]) => {
  // Loop 3 times trying to find a recipe with an image
  let iter = 0
  let randomRecipe = { name: '', imageLocation: '' }
  while (recipes.length && !randomRecipe.imageLocation && iter < 3) {
    randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
    iter++
  }
  return randomRecipe
}

interface Props extends RouteComponentProps {
  filter?: (recipe: PartialRecipe) => boolean
  recipes: PartialRecipe[]
}

export const RecipeCardDeck = ({
  filter,
  history,
  location,
  recipes,
}: Props) => {
  const [visibleRecipes, setVisibleRecipes] = useState<PartialRecipe[]>([])
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
    (searchText: string, allRecipes: PartialRecipe[]) => {
      let newVisibleRecipes = searchText
        .split(' ')
        .reduce((accum, searchWord) => {
          const upperCaseSearchWord = searchWord.toUpperCase()
          return accum.filter((recipe, index) => {
            return (
              recipe.name.toUpperCase().match(upperCaseSearchWord) !== null ||
              recipe.tags.some(
                (tag) => tag.toUpperCase().match(upperCaseSearchWord) !== null
              )
            )
          })
        }, allRecipes)

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
    (recipes: PartialRecipe[]) => {
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
    (searchText: string) => {
      setInitialSearchText('')

      updateRecipesOnSearch(searchText, recipes)

      let searchValue: string | undefined = `?search=${searchText}`
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
    (type: SortType) => {
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

export default withRouter(withRecipes(RecipeCardDeck))
