import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import RecipePicker from './RecipePicker'
import UploadForm from './UploadForm'
import '../styles/UploadForm.css'

function EditForm(props) {
  const [recipeName, setRecipeName] = useState('')
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    // query api
    fetch('/request/recipe/' + recipeName.replace(/ /g, '_'))
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data)
      })
  }, [recipeName])

  return (
    <div>
      <RecipePicker
        onChange={(e) => setRecipeName(e.target.value)}
        initialRecipeName={
          props.location.state ? props.location.state.initialRecipeName : null
        }
      ></RecipePicker>
      <UploadForm recipe={recipe} formSubmitAction='/edit-recipe'></UploadForm>
    </div>
  )
}

EditForm.propTypes = {
  location: PropTypes.shape({ state: PropTypes.object }),
}

export default EditForm
