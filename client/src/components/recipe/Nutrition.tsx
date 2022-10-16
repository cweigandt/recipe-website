import { useEffect } from 'react'
import { decompress } from 'compress-json'

import '../../styles/recipe/Nutrition.css'
import { FullRecipe } from '../../types/RecipeTypes'
import { useDispatch, useSelector } from 'react-redux'
import nutritionSlice from '../../reducers/nutrition'
import { nutrition } from '../../selectors'

type Props = {
  recipe: FullRecipe
}

function Nutrition({ recipe }: Props) {
  const nutritionInfo = useSelector(nutrition(recipe.name))
  const dispatch = useDispatch()

  useEffect(() => {
    if (nutritionInfo) {
      return
    }
    fetch('/request/nutrition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(
          nutritionSlice.actions.saveNutrition({
            recipeName: recipe.name,
            nutrition: decompress(response),
          })
        )
      })
  }, [dispatch, nutritionInfo, recipe])

  if (!nutritionInfo) {
    return null
  }

  return (
    <div className='nutrition'>
      {nutritionInfo.pricePerServing && (
        <span className='nutrition-price' title='Price per serving'>{`$${(
          Math.floor(nutritionInfo.pricePerServing) / 100
        ).toFixed(2)}`}</span>
      )}
      {nutritionInfo.vegetarian && (
        <span className='nutrition-info vegetarian' title='Vegetarian'>
          VE
        </span>
      )}
      {nutritionInfo.vegan && (
        <span className='nutrition-info vegan' title='Vegan'>
          VN
        </span>
      )}
      {nutritionInfo.dairyFree && (
        <span className='nutrition-info dairy-free' title='Dairy free'>
          DF
        </span>
      )}
      {nutritionInfo.glutenFree && (
        <span className='nutrition-info gluten-free' title='Gluten free'>
          GF
        </span>
      )}
      {nutritionInfo.error && (
        <span
          className='nutrition-info nutrition-error'
          title={nutritionInfo.error}
        >
          N/A
        </span>
      )}
    </div>
  )
}

export default Nutrition
