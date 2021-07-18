import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import '../styles/Recipe.css'
import Badge from './Badge'

function Recipe(props) {
  const [recipe, setRecipe] = useState({})
  const [cookies] = useCookies(['user'])

  const wrapperRef = React.useRef()

  useEffect(() => {
    const recipeName = props.urlName.replace(/_/g, ' ')
    const foundRecipe = window.serverData.allRecipes.find(
      (r) => r.name === recipeName
    )

    setRecipe(foundRecipe)
  }, [props.urlName])

  function renderIngredients(ingredients) {
    return (
      <ul class='ingredients-list' id='ingredientsList'>
        {ingredients.map((ingredient) => {
          return <li class='ingredient-item'>{ingredient}</li>
        })}
      </ul>
    )
  }

  function renderSubIngredients(title, ingredients) {
    return (
      title && (
        <div>
          <div class='ingredients-title'>{title}</div>
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
            <li class='recipe-step-item'>
              <div class='stepTitle'>Step {num + 1}</div>
              <div class='stepText'>{step}</div>
            </li>
          )
        })}
      </ul>
    )
  }

  function renderTags(tags) {
    return (
      tags.length > 0 && (
        <div class='badge-list noprint'>
          <div class='tagTitle'>Tags</div>
          {tags.map((tag) => {
            return (
              <Badge>
                <a href={'/tag/' + tag.replace(/ /g, '_')} class='tag-link'>
                  {tag}
                </a>
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
    <div id='recipeWrapper' class='print' ref={wrapperRef}>
      <div id='recipeTitle'>{recipe.name}</div>
      <div id='subTitle'>
        <span id='sectionName'>{recipe.section.toLowerCase()}</span>
        <span id='dotSeparator'>&#9679;</span>
        <span id='servings'>servings | </span>
        <span id='servingsNumber'>{recipe.servings}</span>
      </div>
      <div id='socialButtons' class='noprint'>
        <div
          class='btn socialIcon'
          onClick={() => {
            window.print()
            return false
          }}
        >
          <i class='fa fa-print'></i>
        </div>
        {cookies['bccookbook-can-edit'] && (
          <Link
            to={{
              pathname: '/edit',
              state: { initialRecipeName: recipe.name },
            }}
            class='btn socialIcon'
          >
            <i class='fa fa-edit'></i>
          </Link>
        )}
      </div>

      <div class='image-wrapper'>
        <img id='recipeImage' src={recipe.imageLocation} alt='' />
      </div>

      <div class='row no-gutters' id='recipeBody'>
        <div class='col-sm-4' id='ingredientsColumn'>
          <div class='sticky' id='ingredientsColumnSticky'>
            <div class='ingredients-title'>Ingredients</div>
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

        <div class='col-sm-8' id='stepsColumn'>
          {renderStepsList(recipe.steps)}
          {renderTags(recipe.tags)}
        </div>
      </div>
    </div>
  )
}

Recipe.propTypes = {
  urlName: PropTypes.string.isRequired,
}

export default Recipe
