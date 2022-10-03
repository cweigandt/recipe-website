import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../reducers'
import { FullRecipe } from '../../types/RecipeTypes'

import '../../styles/groceries/GroceriesContainer.css'
import RecipeCard from '../carddeck/RecipeCard'

interface GroceriesContainerProps {
  cart: FullRecipe[]
}

const REMOVE_NUMBER_REGEX = /^[ 0-9,-]*/g

const GroceriesContainer = ({ cart }: GroceriesContainerProps) => {
  const [ingredients, setIngredients] = useState<string[]>([])

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

  return (
    <div id='groceries-container'>
      <div id='recipeCardDeck'>
        {cart.map((recipe) => (
          <RecipeCard {...recipe} />
        ))}
      </div>
      <div className='groceries-ingredients'>
        {ingredients.map((ingredient) => (
          <div className='ingredient'>{ingredient}</div>
        ))}
      </div>
    </div>
  )
}

export default connect((state: RootState) => ({
  cart: state.groceries.cart,
}))(GroceriesContainer)
