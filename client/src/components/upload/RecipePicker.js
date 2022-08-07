import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import '../../styles/upload/UploadForm.css'
import withRecipes from '../hoc/withRecipes'

const sortRecipes = (recipes) => {
  return [...recipes].sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    }
    return 0
  })
}
function RecipePicker(props) {
  const [sortedRecipes, setSortedRecipes] = useState([])
  const dropdownRef = useRef(null)

  const { onChange, recipes } = props
  useEffect(() => {
    setSortedRecipes(sortRecipes([...recipes]))
    onChange({ target: dropdownRef.current })
  }, [recipes, onChange])

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
      {sortedRecipes.map((recipe) => renderOption(recipe.name))}
    </select>
  )
}

RecipePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialRecipeName: PropTypes.string,
}

export default withRecipes(RecipePicker)
