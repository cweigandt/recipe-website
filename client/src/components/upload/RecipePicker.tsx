import { useEffect, useState, useRef } from 'react'

import '../../styles/upload/UploadForm.css'
import { PartialRecipe } from '../../types/RecipeTypes'
import withRecipes from '../hoc/withRecipes'

const sortRecipes = (recipes: PartialRecipe[]) => {
  return [...recipes].sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    }
    return 0
  })
}

type Props = {
  onChange: (obj: { target: HTMLSelectElement }) => void
  initialRecipeName?: string
  recipes: PartialRecipe[]
}

function RecipePicker(props: Props) {
  const [sortedRecipes, setSortedRecipes] = useState<PartialRecipe[]>([])
  const dropdownRef = useRef(null)

  const { onChange, recipes } = props
  useEffect(() => {
    setSortedRecipes(sortRecipes([...recipes]))
    onChange({ target: dropdownRef.current! })
  }, [recipes, onChange])

  const renderOption = (name: string) => {
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

export default withRecipes(RecipePicker)
