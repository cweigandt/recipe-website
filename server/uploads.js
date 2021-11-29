const customDB = require('./getters/getDB')
const express = require('express')

const auth = require('./getters/getAuth')
const Storage = require('./getters/getStorage')

module.exports = function (app) {
  const handleUploadForm = (req, res, thumbnail) => {
    try {
      customDB
        .handleUploadForm(req.body, req.file, thumbnail)
        .then(() => {
          res.status(200)
          res.send({
            response: `Edit for ${req.body.name} was successful`,
          })
        })
        .catch((err) => {
          res.status(500)
          res.send({ response: err.message, stack: err.stack })
        })
    } catch (err) {
      res.status(500)
      res.send({ response: err.message, stack: err.stack })
    }
  }

  app.post(
    '/upload-recipe',
    Storage.imageMiddleware,
    async function (req, res, next) {
      if (!auth.validateJWT(req)) {
        res.status(401).end()
        return
      }

      Storage.saveThumbnail(req, res).then((thumbnail) => {
        handleUploadForm(req, res, thumbnail)
      })
    }
  )

  app.post(
    '/edit-recipe',
    Storage.imageMiddleware,
    async function (req, res, next) {
      if (!auth.validateJWT(req)) {
        res.status(401).end()
        return
      }

      try {
        Storage.saveThumbnail(req, res).then((thumbnail) => {
          customDB
            .handleEditForm(req.body, req.file, thumbnail)
            .then(() => {
              res.status(200)
              res.send({ response: `Edit for ${req.body.name} was successful` })
            })
            .catch((err) => {
              res.status(500)
              res.send({ response: err.message, stack: err.stack })
            })
        })
      } catch (err) {
        res.status(500)
        res.send({ response: err.message, stack: err.stack })
      }
    }
  )

  app.post('/i-made-dis', express.json(), (req, res) => {
    if (!auth.validateJWT(req)) {
      res.status(401).end()
      return
    }

    const recipeName = req.body.recipeName
    customDB
      .handleIMadeThis(recipeName)
      .then(() => {
        res.status(200)
        res.send({ response: `Edit for ${recipeName} was successful` })
      })
      .catch((err) => {
        res.status(500)
        res.send({ response: err.message, stack: err.stack })
      })
  })

  app.post('/recipe-visit', express.json(), (req, res) => {
    // Intentionally don't check auth here so all requests are logged

    const recipeName = req.body.recipeName
    customDB
      .handleRecipeVisit(recipeName)
      .then(() => {
        res.status(200)
        res.send({ response: `Edit for ${recipeName} was successful` })
      })
      .catch((err) => {
        res.status(500)
        res.send({ response: err.message, stack: err.stack })
      })
  })

  app.post('/rename-tag', express.json(), (req, res) => {
    const fromTag = req.body.fromTag
    const toTag = req.body.toTag
    customDB
      .handleTagRename(fromTag, toTag)
      .then(() => {
        res.status(200)
        res.send({
          response: `Rename from ${fromTag} to ${toTag} was successful`,
        })
      })
      .catch((err) => {
        res.status(500)
        res.send({ response: err.message, stack: err.stack })
      })
  })

  app.get('/manualUpdate', async function (req, res, next) {
    // This code is here for a template
    res.redirect('/')
    return

    let handled = 0
    await customDB
      .getAllRecipes()
      .then((recipes) => {
        recipes.forEach(async (recipe, index) => {
          setTimeout(async () => {
            console.log(recipe.name)
            await customDB.manuallyUpdate(recipe.name, 'visits', 0)

            handled = handled + 1
            if (handled === recipes.length) {
              res.status(200)
              res.redirect('/')
            }
          }, 100 * (index - handled))
        })
      })
      .catch(console.error)
  })
}
