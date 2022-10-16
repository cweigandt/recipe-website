import { useCallback, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducers'
import { FullRecipe } from '../../types/RecipeTypes'

import '../../styles/groceries/GroceriesContainer.css'
import RecipeCard from '../carddeck/RecipeCard'
import alertSlice from '../../reducers/alerts'
import groceriesSlice from '../../reducers/groceries'

import { ReactComponent as XCircle } from '../../svg/x-circle.svg'
import { ReactComponent as Copy } from '../../svg/copy.svg'
import { ALERT_TYPES } from '../../constants/AlertTypes'
import { allNutrition } from '../selectors'
import IngredientsList from './IngredientsList'

interface GroceriesContainerProps {
  cart: FullRecipe[]
}

const REMOVE_NUMBER_REGEX = /^[ 0-9,-]*/g

const GroceriesContainer = ({ cart }: GroceriesContainerProps) => {
  const [ingredients, setIngredients] = useState<string[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    let cartIngredients = cart
      .reduce((accum: string[], recipe) => {
        return accum.concat(...recipe.ingredients)
      }, [])
      .sort((i1, i2) => {
        return i1
          .replace(REMOVE_NUMBER_REGEX, '')
          .localeCompare(i2.replace(REMOVE_NUMBER_REGEX, ''))
      })

    setIngredients(cartIngredients)
  }, [cart])

  const handleRemoveFromCart = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(groceriesSlice.actions.removeFromCart({ index }))
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
        {cart.map((recipe, index) => (
          <RecipeCard {...recipe}>
            <div
              className='clear-from-cart'
              onClick={(e) => handleRemoveFromCart(e, index)}
            >
              <XCircle />
            </div>
          </RecipeCard>
        ))}
      </div>
      <div id='copy-ingredients' onClick={handleCopy}>
        <Copy />
      </div>
      <IngredientsList cart={cart} />
    </div>
  )
}

export default connect((state: RootState) => ({
  cart: state.groceries.cart,
}))(GroceriesContainer)
