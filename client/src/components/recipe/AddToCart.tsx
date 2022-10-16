import { FullRecipe, IngredientType } from '../../types/RecipeTypes'
import { ReactComponent as CartAddSVG } from '../../svg/cart-add.svg'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import groceriesSlice from '../../reducers/groceries'
import { cartSelector, isShoppingSelector } from '../../selectors'

interface AddToCartProps {
  recipe: FullRecipe
  ingredientType?: IngredientType
}

const AddToCart = ({
  ingredientType = 'ingredients',
  recipe,
}: AddToCartProps) => {
  const isShopping = useSelector(isShoppingSelector)
  const cart = useSelector(cartSelector)
  const dispatch = useDispatch()

  const handleAddClick = useCallback(() => {
    dispatch(groceriesSlice.actions.addToCart({ ingredientType, recipe }))
  }, [dispatch, ingredientType, recipe])

  const handleRemoveClick = useCallback(() => {
    dispatch(
      groceriesSlice.actions.removeIngredientsFromCart({
        ingredientType,
        recipe,
      })
    )
  }, [dispatch, ingredientType, recipe])

  if (!isShopping) {
    return null
  }

  if (cart[recipe.name]) {
    const hasIngredientInCart =
      cart[recipe.name].ingredientTypes.includes(ingredientType)
    if (hasIngredientInCart) {
      return (
        <div className='in-cart' onClick={handleRemoveClick}>
          In Cart
        </div>
      )
    }
  }

  return (
    <div className='add-to-cart' onClick={handleAddClick}>
      <CartAddSVG />
    </div>
  )
}

export default AddToCart
