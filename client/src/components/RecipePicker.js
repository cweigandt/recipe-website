import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import '../styles/UploadForm.css'

const sortRecipes = (recipes) => {
  return recipes.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    }
    return 0
  })
}
function RecipePicker(props) {
  const [recipes, setRecipes] = useState([])
  const dropdownRef = useRef(null)

  useEffect(() => {
    setRecipes(sortRecipes(window.serverData.allRecipes))
    props.onChange({ target: dropdownRef.current })
  }, [props])

  const renderOption = (name) => {
    return (
      <option value={name} selected={name === props.initialRecipeName}>
        {name}
      </option>
    )
  }

  return (
    <select id='recipePicker' onChange={props.onChange} ref={dropdownRef}>
      {renderOption('')}
      {recipes.map((recipe) => renderOption(recipe.name))}
    </select>
  )
}

RecipePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialRecipeName: PropTypes.string,
}

export default RecipePicker
