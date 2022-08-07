import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import '../../styles/recipe/Recipe.css'
import '../../styles/recipe/Print.css'
import Badge from '../widgets/Badge'
import Nutrition from './Nutrition'
import RecipeMadeButton from './RecipeMadeButton'
import RecipeCookedDates from './RecipeCookedDates'
import OptionsButtons from './OptionsButtons'
import RecipeImage from './RecipeImage'
import { FullRecipe } from '../../types/RecipeTypes'
import { useRef } from 'react'
// import withCSSAnimation from '../hoc/withCSSAnimation'

type Props = {
  urlName: string
}

const Recipe = ({ urlName }: Props) => {
  const [recipe, setRecipe] = useState<FullRecipe | null>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const recipeName = urlName.replace(/_/g, ' ')

    fetch(`/request/recipe/${recipeName}`)
      .then((data) => data.json())
      .then((data) => setRecipe(data))
  }, [urlName])

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

  const renderIngredients = (ingredients: string[]) => {
    return (
      <ul className='ingredients-list' id='ingredientsList'>
        {ingredients.map((ingredient) => {
          return <li className='ingredient-item'>{ingredient}</li>
        })}
      </ul>
    )
  }

  const renderSubIngredients = (title: string, ingredients: string[]) => {
    return (
      title && (
        <div>
          <div className='ingredients-title'>{title}</div>
          {renderIngredients(ingredients)}
        </div>
      )
    )
  }

  const renderStepsList = (steps: string[]) => {
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

  const renderTags = (tags: string[]) => {
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

  if (!recipe) {
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

// export default withCSSAnimation(Recipe, {
//   timeout: 200,
// })

export default Recipe
