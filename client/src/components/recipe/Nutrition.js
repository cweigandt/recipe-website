import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import '../../styles/recipe/Nutrition.css'

const cachedNutritionInfo = {}

function Nutrition({ recipe }) {
  const [nutritionInfo, setNutritionInfo] = useState({})

  useEffect(() => {
    if (Object.keys(recipe).length === 0) {
      return
    }

    if (cachedNutritionInfo.hasOwnProperty(recipe.name)) {
      setNutritionInfo({
        ...cachedNutritionInfo[recipe.name],
      })
      return
    }

    fetch('/request/nutrition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then((response) => response.json())
      .then((response) => {
        setNutritionInfo(response)
      })
  }, [recipe])

  return (
    <div class='nutrition'>
      {nutritionInfo.pricePerServing && (
        <span class='nutrition-price' title='Price per serving'>{`$${(
          Math.floor(nutritionInfo.pricePerServing) / 100
        ).toFixed(2)}`}</span>
      )}
      {nutritionInfo.vegetarian && (
        <span class='nutrition-info vegetarian' title='Vegetarian'>
          VE
        </span>
      )}
      {nutritionInfo.vegan && (
        <span class='nutrition-info vegan' title='Vegan'>
          VN
        </span>
      )}
      {nutritionInfo.dairyFree && (
        <span class='nutrition-info dairy-free' title='Dairy free'>
          DF
        </span>
      )}
      {nutritionInfo.glutenFree && (
        <span class='nutrition-info gluten-free' title='Gluten free'>
          GF
        </span>
      )}
      {nutritionInfo.error && (
        <span
          class='nutrition-info nutrition-error'
          title={nutritionInfo.error}
        >
          N/A
        </span>
      )}
    </div>
  )
}

Nutrition.propTypes = {
  recipe: PropTypes.object.isRequired,
}

export default Nutrition
