import { useSelector } from 'react-redux'
import { ExtendedIngredient, NutritionInfo } from '../../types/Nutrition'
import { FullRecipe } from '../../types/RecipeTypes'
import { allNutrition } from '../selectors'

interface IngredientsListProps {
  cart: FullRecipe[]
}

const buildMap = (
  cart: FullRecipe[],
  nutritionMap: { [recipeName: string]: NutritionInfo }
) => {
  const ingredientMap: { [aisle: string]: ExtendedIngredient[] } = {}

  cart.forEach((recipe) => {
    const info = nutritionMap[recipe.name]
    if (!info || !info.extendedIngredients) {
      console.error(`Could not find nutrition info for ${recipe.name}`)
    } else {
      info.extendedIngredients.forEach((ing) => {
        const current = ingredientMap[ing.aisle] || []
        ingredientMap[ing.aisle] = current.concat(ing)
      })
    }
  })

  return ingredientMap
}

const IngredientsList = ({ cart }: IngredientsListProps) => {
  const nutritionMap = useSelector(allNutrition)
  const ingredientsMap = buildMap(cart, nutritionMap)

  return (
    <div className='groceries-ingredients'>
      {Object.keys(ingredientsMap).map((aisle) => {
        return (
          <div>
            {/* <div className='ingredient' style={{ marginTop: 10 }}>
              <strong>{aisle}</strong>
            </div> */}
            {ingredientsMap[aisle].map((ing) => {
              return <div className='ingredient'>{ing.originalName}</div>
            })}
          </div>
        )
      })}
    </div>
  )
}

export default IngredientsList
