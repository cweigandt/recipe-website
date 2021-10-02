import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../../styles/recipe/Recipe.css'
import '../../styles/recipe/Print.css'
import Badge from '../widgets/Badge'
import Nutrition from './Nutrition'
import RecipeMadeButton from './RecipeMadeButton'
import RecipeCookedDates from './RecipeCookedDates'
import OptionsButtons from './OptionsButtons'

function Recipe(props) {
  const [recipe, setRecipe] = useState({})

  const wrapperRef = React.useRef()

  useEffect(() => {
    const recipeName = props.urlName.replace(/_/g, ' ')
    const foundRecipe = window.serverData.allRecipes.find(
      (r) => r.name === recipeName
    )

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

    setRecipe(foundRecipe)
  }, [props.urlName])

  function renderIngredients(ingredients) {
    return (
      <ul className='ingredients-list' id='ingredientsList'>
        {ingredients.map((ingredient) => {
          return <li className='ingredient-item'>{ingredient}</li>
        })}
      </ul>
    )
  }

  function renderSubIngredients(title, ingredients) {
    return (
      title && (
        <div>
          <div className='ingredients-title'>{title}</div>
          {renderIngredients(ingredients)}
        </div>
      )
    )
  }

  function renderStepsList(steps) {
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

  function renderTags(tags) {
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

  setTimeout(() => {
    wrapperRef.current.classList.add('loaded')
  }, 200)

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
      <OptionsButtons isLoggedIn={props.isLoggedIn} recipe={recipe} />

      <div className='image-wrapper'>
        <img id='recipeImage' src={recipe.imageLocation} alt='' />
      </div>

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

export default connect((state) => ({ isLoggedIn: state.login.isLoggedIn }))(
  Recipe
)
