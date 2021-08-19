const customDB = require('./db/db')

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
}
