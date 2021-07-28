import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import '../../styles/Nutrition.css'

import { API_KEYS } from '../../api/credentials'

const spoonacularAPI = `https://api.spoonacular.com/recipes/analyze?apiKey=${API_KEYS.spoonacular}&includeNutrition=false`

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

    // Make sure every step ends in a period when joined
    const steps = recipe.steps
      .map((step) => {
        let trimmed = step.trim()
        if (trimmed[trimmed.length - 1] !== '.') {
          trimmed = trimmed + '.'
        }
        return trimmed
      })
      .join(' ')

    const body = {
      title: recipe.name,
      servings: recipe.servings === '-' ? 4 : JSON.parse(recipe.servings),
      ingredients: recipe.ingredients
        .concat(recipe.subIngredients1)
        .concat(recipe.subIngredients2),
      instructions: steps,
    }

    fetch(spoonacularAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 402) {
        // No more tokens for today
        setNutritionInfo({
          error: 'Nutrition api usage limit reached today',
        })
      } else if (response.status !== 200) {
        console.log(response)
        setNutritionInfo({
          error: `Unknown ${response.status} error occurred`,
        })
      } else {
        response.json().then((data) => {
          cachedNutritionInfo[recipe.name] = data
          setNutritionInfo({
            ...data,
          })
        })
      }
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
