const customDB = require('./db/db')

module.exports = function (app) {
  app.get('/request/recipe/:recipeName', (req, res) => {
    var requestedRecipe = req.params.recipeName

    requestedRecipe = requestedRecipe.replace(/_/g, ' ')
    var dbPromise = customDB.requestRecipe(requestedRecipe)
    dbPromise
      .then((recipeData) => {
        res.send(recipeData)
      })
      .catch((err) => {
        res.status(500)
        console.log(err)
      })
  })

  app.get('/request/sections', (req, res) => {
    var dbPromise = customDB.getSections()
    dbPromise
      .then((sections) => {
        res.send(sections.data)
      })
      .catch((err) => {
        res.status(500)
        console.log(err)
      })
  })

  app.get('/request/all-recipes', (req, res) => {
    var dbPromise = customDB.getAllRecipes()
    dbPromise
      .then((recipes) => {
        res.send(recipes)
      })
      .catch((err) => {
        res.status(500)
        console.log(err)
      })
  })

  app.get('/request/all-grid-recipes', (req, res) => {
    var dbPromise = customDB.getRecipeImages()
    dbPromise
      .then((recipes) => {
        res.send(recipes)
      })
      .catch((err) => {
        res.status(500)
        console.log(err)
      })
  })

  app.get('/request/all-recipe-names', (req, res) => {
    var dbPromise = customDB.getNamesOfRecipes()
    dbPromise
      .then((recipes) => {
        res.send(recipes)
      })
      .catch((err) => {
        res.status(500)
        console.log(err)
      })
  })

  app.get('/request/recipes/:sectionName', (req, res) => {
    var sectionName = req.params.sectionName

    var dbPromise = customDB.getSectionRecipes(sectionName)
    dbPromise
      .then((recipes) => {
        res.send(recipes)
      })
      .catch((err) => {
        res.status(500)
        console.log(err)
      })
  })

  app.get('/request/tag/:tagName', (req, res) => {
    var tagName = req.params.tagName

    var dbPromise = customDB.getRecipesWithTag(tagName)
    dbPromise
      .then((recipes) => {
        res.send(recipes)
      })
      .catch((err) => {
        res.status(500)
        console.log(err)
      })
  })
}
