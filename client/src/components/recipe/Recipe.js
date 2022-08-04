import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../../styles/recipe/Recipe.css'
import '../../styles/recipe/Print.css'
import Badge from '../widgets/Badge'
import Nutrition from './Nutrition'
import RecipeMadeButton from './RecipeMadeButton'
import RecipeCookedDates from './RecipeCookedDates'
import OptionsButtons from './OptionsButtons'
import RecipeImage from './RecipeImage'
import withCSSAnimation from '../hoc/withCSSAnimation'
import useRecipes from '../../hooks/useRecipes'

const Recipe = ({ urlName }) => {
  const recipes = useRecipes()
  const [recipe, setRecipe] = useState({})

  const wrapperRef = React.useRef()

  useEffect(() => {
    const recipeName = urlName.replace(/_/g, ' ')
    const foundRecipe = recipes.find((r) => r.name === recipeName)

    if (!foundRecipe) {
      return
    }

    setRecipe(foundRecipe)
  }, [recipes, urlName])

  useEffect(() => {
    const recipeName = urlName.replace(/_/g, ' ')

    if (window.location.hostname !== 'localhost') {
      // Only save visits of hosted site
      fetch('/recipe-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeName,
        }),
      })
    }
  }, [urlName])

  const renderIngredients = (ingredients) => {
    return (
      <ul className='ingredients-list' id='ingredientsList'>
        {ingredients.map((ingredient) => {
          return <li className='ingredient-item'>{ingredient}</li>
        })}
      </ul>
    )
  }

  const renderSubIngredients = (title, ingredients) => {
    return (
      title && (
        <div>
          <div className='ingredients-title'>{title}</div>
          {renderIngredients(ingredients)}
        </div>
      )
    )
  }

  const renderStepsList = (steps) => {
    return (
      <ul id='stepsList'>
        {steps.map((step, num) => {
          return (
            <li className='recipe-step-item'>
              <div className='stepTitle'>Step {num + 1}</div>
              <div className='stepText'>{step}</div>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderTags = (tags) => {
    return (
      tags.length > 0 && (
        <div className='badge-list noprint'>
          <div className='tagTitle'>Tags</div>
          {tags.map((tag) => {
            return (
              <Badge>
                <Link
                  to={'/tag/' + tag.replace(/ /g, '_')}
                  className='tag-link'
                >
                  {tag}
                </Link>
              </Badge>
            )
          })}
        </div>
      )
    )
  }

  if (!recipe.name) {
    // Recipe hasn't finished loading
    return <div id='recipeWrapper'></div>
  }

  return (
    <div id='recipeWrapper' className='print' ref={wrapperRef}>
      <div id='recipeTitle'>{recipe.name}</div>
      <div id='subTitle'>
        <span id='sectionName'>{recipe.section.toLowerCase()}</span>
        <span id='dotSeparator'>&#9679;</span>
        <span id='servings'>servings | </span>
        <span id='servingsNumber'>{recipe.servings}</span>
        <span id='dotSeparator'>&#9679;</span>
        {<Nutrition recipe={recipe} />}
      </div>
      <OptionsButtons recipe={recipe} />

      <RecipeImage imageLocation={recipe.imageLocation} />

      <RecipeCookedDates dates={recipe.cookedDates} />

      <div id='recipeBody'>
        <div id='ingredientsColumn'>
          <div className='sticky' id='ingredientsColumnSticky'>
            <div className='ingredients-title'>Ingredients</div>
            {renderIngredients(recipe.ingredients)}
            {renderSubIngredients(
              recipe.subIngredients1Name,
              recipe.subIngredients1
            )}
            {renderSubIngredients(
              recipe.subIngredients2Name,
              recipe.subIngredients2
            )}
            {renderTags(recipe.tags)}
          </div>
        </div>

        <div id='stepsColumn'>
          {renderStepsList(recipe.steps)}
          {renderTags(recipe.tags)}
        </div>

        <RecipeMadeButton
          recipeName={recipe.name}
          cookedDates={recipe.cookedDates}
        />
      </div>
    </div>
  )
}

Recipe.propTypes = {
  urlName: PropTypes.string.isRequired,
}

export default withCSSAnimation(Recipe, {
  timeout: 200,
})
