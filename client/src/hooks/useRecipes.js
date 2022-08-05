import { useEffect, useState } from 'react'

const useRecipes = () => {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    fetch('/request/all-recipes')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data)
      })
  }, [])

  return recipes
}

export default useRecipes
