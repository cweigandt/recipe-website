import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import RecipePicker from './RecipePicker'
import UploadForm from './UploadForm'
import '../../styles/upload/UploadForm.css'
import withRecipes from '../hoc/withRecipes'

function EditForm({ recipes, location }) {
  const [recipeName, setRecipeName] = useState('')
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.name === recipeName)
    setRecipe(foundRecipe || {})
  }, [recipeName, recipes])

  return (
    <div>
      <RecipePicker
        onChange={(e) => setRecipeName(e.target.value)}
        initialRecipeName={
          location.state ? location.state.initialRecipeName : null
        }
      ></RecipePicker>
      <UploadForm recipe={recipe} formSubmitAction='/edit-recipe'></UploadForm>
    </div>
  )
}

EditForm.propTypes = {
  location: PropTypes.shape({ state: PropTypes.object }),
}

export default withRecipes(EditForm, true)
