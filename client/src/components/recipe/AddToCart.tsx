import { FullRecipe } from '../../types/RecipeTypes'
import { ReactComponent as CartAddSVG } from '../../svg/cart-add.svg'
import { useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'

import groceriesSlice from '../../reducers/groceries'
import { RootState } from '../../reducers'

interface AddToCartProps {
  isShopping: boolean
  recipe: FullRecipe
}

const AddToCart = ({ isShopping, recipe }: AddToCartProps) => {
  const dispatch = useDispatch()

  const handleAddClick = useCallback(() => {
    dispatch(groceriesSlice.actions.addToCart({ recipe }))
  }, [dispatch, recipe])

  if (!isShopping) {
    return null
  }

  return (
    <div className='add-to-cart' onClick={handleAddClick}>
      <CartAddSVG />
    </div>
  )
}

export default connect((state: RootState) => ({
  isShopping: state.groceries.isShopping,
}))(AddToCart)
