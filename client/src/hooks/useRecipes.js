import { useEffect, useState } from 'react'

const useRecipes = () => {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    const windowRecipes = window.serverData && window.serverData.allRecipes
    if (windowRecipes && windowRecipes.length > 0) {
      setRecipes(windowRecipes)
      return
    }

    fetch('/request/all-recipes')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data)
      })
  }, [])

  return recipes
}

export default useRecipes
