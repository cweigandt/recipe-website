import GridCard from './GridCard'
import '../../styles/grid/RecipeGrid.css'
import withRecipes from '../hoc/withRecipes'
import { PartialRecipe } from '../../types/RecipeTypes'

type Props = {
  recipes: PartialRecipe[]
}

function RecipeGrid({ recipes }: Props) {
  return (
    <div id='recipeGrid' className={recipes.length === 0 ? '' : 'loaded'}>
      {recipes
        .filter((recipe) => {
          return recipe.thumbnail && recipe.thumbnail.length > 0
        })
        .map((recipe) => {
          return <GridCard {...recipe}></GridCard>
        })}
    </div>
  )
}

export default withRecipes(RecipeGrid)
