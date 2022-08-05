import { useEffect, useState } from 'react'

const useRecipes = (getAllData) => {
  const endpoint = getAllData
    ? '/request/all-full-recipes'
    : '/request/all-recipes'

  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data)
      })
  }, [])

  return recipes
}

export default useRecipes
