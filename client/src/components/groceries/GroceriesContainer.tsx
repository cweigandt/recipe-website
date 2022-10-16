import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../styles/groceries/GroceriesContainer.css'
import RecipeCard from '../carddeck/RecipeCard'
import alertSlice from '../../reducers/alerts'
import groceriesSlice from '../../reducers/groceries'

import { ReactComponent as XCircle } from '../../svg/x-circle.svg'
import { ReactComponent as Copy } from '../../svg/copy.svg'
import { ALERT_TYPES } from '../../constants/AlertTypes'
import IngredientsList from './IngredientsList'
import { cartSelector } from '../../selectors'
import { FullRecipe } from '../../types/RecipeTypes'

const REMOVE_NUMBER_REGEX = /^[ 0-9,-]*/g

const GroceriesContainer = () => {
  const [ingredients, setIngredients] = useState<string[]>([])
  const cart = useSelector(cartSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    let cartIngredients = Object.values(cart)
      .reduce((accum: string[], cartItem) => {
        const newIngredients: string[] = []
        cartItem.ingredientTypes.forEach((ingredientType) => {
          newIngredients.push(...cartItem.recipe[ingredientType])
        })
        return accum.concat(...newIngredients)
      }, [])
      .sort((i1, i2) => {
        return i1
          .replace(REMOVE_NUMBER_REGEX, '')
          .localeCompare(i2.replace(REMOVE_NUMBER_REGEX, ''))
      })

    setIngredients(cartIngredients)
  }, [cart])

  const handleRemoveFromCart = (e: React.MouseEvent, recipe: FullRecipe) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(groceriesSlice.actions.removeFromCart({ recipe }))
  }

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(ingredients.join('\n'))
    dispatch(
      alertSlice.actions.addAlert({
        text: `Ingredients copied to clipboard`,
        style: ALERT_TYPES.SUCCESS,
      })
    )
  }, [dispatch, ingredients])

  return (
    <div id='groceriesContainer'>
      <div id='recipeCardDeck'>
        {Object.values(cart).map((cartItem, index) => (
          <RecipeCard key={index} {...cartItem.recipe}>
            <div
              className='clear-from-cart'
              onClick={(e) => handleRemoveFromCart(e, cartItem.recipe)}
            >
              <XCircle className='grocery-recipe-x' />
            </div>
          </RecipeCard>
        ))}
      </div>
      <div id='copy-ingredients' onClick={handleCopy}>
        <Copy />
      </div>
      <IngredientsList ingredients={ingredients} />
    </div>
  )
}

export default GroceriesContainer
