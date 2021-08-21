const customDB = require('./db/getDB')
const express = require('express')
const api = require('./getAPI')

const reactToDBPromise = (promise, res) => {
  promise
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500)
      console.log(err)
    })
}

module.exports = function (app) {
  app.get('/request/recipe/:recipeName', (req, res) => {
    const requestedRecipe = req.params.recipeName.replace(/_/g, ' ')
    reactToDBPromise(customDB.requestRecipe(requestedRecipe), res)
  })

  app.get('/request/sections', (req, res) => {
    reactToDBPromise(customDB.getSections(), res)
  })

  app.get('/request/all-recipes', (req, res) => {
    reactToDBPromise(customDB.getAllRecipes(), res)
  })

  app.get('/request/all-grid-recipes', (req, res) => {
    reactToDBPromise(customDB.getRecipeImages(), res)
  })

  app.get('/request/all-recipe-names', (req, res) => {
    reactToDBPromise(customDB.getNamesOfRecipes(), res)
  })

  app.get('/request/recipes/:sectionName', (req, res) => {
    const sectionName = req.params.sectionName
    reactToDBPromise(customDB.getSectionRecipes(sectionName), res)
  })

  app.get('/request/tag/:tagName', (req, res) => {
    const tagName = req.params.tagName
    reactToDBPromise(customDB.getRecipesWithTag(tagName), res)
  })

  app.post('/request/nutrition', express.json(), (req, res) => {
    const recipe = req.body

    // Make sure every step ends in a period when joined
    const steps = recipe.steps
      .map((step) => {
        let trimmed = step.trim()
        if (trimmed[trimmed.length - 1] !== '.') {
          trimmed = trimmed + '.'
        }
        return trimmed
      })
      .join(' ')

    const body = {
      title: recipe.name,
      servings: recipe.servings === '-' ? 4 : JSON.parse(recipe.servings),
      ingredients: recipe.ingredients
        .concat(recipe.subIngredients1)
        .concat(recipe.subIngredients2),
      instructions: steps,
    }

    res.set('Content-Type', 'application/json')
    reactToDBPromise(api.spoonacularFetch(body), res)
  })
}
