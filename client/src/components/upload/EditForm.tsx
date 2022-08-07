import { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import RecipePicker from './RecipePicker'
import UploadForm from './UploadForm'
import '../../styles/upload/UploadForm.css'
import withRecipes from '../hoc/withRecipes'
import { FullRecipe } from '../../types/RecipeTypes'

interface Props
  extends RouteComponentProps<any, any, { initialRecipeName: string }> {
  recipes: FullRecipe[]
}
function EditForm({ recipes, location }: Props) {
  const [recipeName, setRecipeName] = useState('')
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.name === recipeName)
    setRecipe(foundRecipe || {})
  }, [recipeName, recipes])

  return (
    <div>
      <RecipePicker
        // @ts-expect-error no idea
        onChange={(e) => setRecipeName(e.target.value)}
        initialRecipeName={
          location.state ? location.state.initialRecipeName : null
        }
      ></RecipePicker>
      {/* @ts-expect-error no idea */}
      <UploadForm recipe={recipe} formSubmitAction='/edit-recipe'></UploadForm>
    </div>
  )
}

export default withRecipes(EditForm, true)
