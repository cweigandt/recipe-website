const recipes = require('./mockRecipes')
const bcrypt = require('bcrypt')
const { rinseInput } = require('../db/uploadUtils')

exports.requestRecipe = function (recipeName) {
  return new Promise((resolve, reject) => {
    let found = null
    recipes.forEach((recipe) => {
      if (recipe.name === recipeName) {
        found = recipe
      }
    })

    if (found) {
      resolve(found)
    } else {
      reject('No recipe by name: ' + recipeName)
    }
  })
}

exports.getSections = function () {
  return new Promise((resolve, reject) => {
    resolve(['Appetizers', 'Breakfast', 'Drinks'])
  })
}

exports.getAllRecipes = function () {
  return new Promise((resolve, reject) => {
    resolve(recipes)
  })
}

exports.getNamesOfRecipes = function () {
  return new Promise((resolve, reject) => {
    resolve(recipes.map((recipe) => recipe.name))
  })
}

exports.getSectionRecipes = function (section) {
  return new Promise((resolve, reject) => {
    resolve(recipes.filter((recipe) => recipe.section === section))
  })
}

exports.getRecipesWithTag = function (tag) {
  return new Promise((resolve, reject) => {
    resolve(recipes.filter((recipe) => recipe.tags.includes(tag)))
  })
}

exports.getRecipeImages = function () {
  return new Promise((resolve, reject) => {
    resolve(recipes.map((recipe) => recipe.imageLocation))
  })
}

exports.handleUploadForm = function (body, file, thumbnail) {
  const recipe = rinseInput(body, file, thumbnail)
  recipes.push(recipe)
}

exports.handleEditForm = function (body, file, thumbnail) {
  console.error('should not be editing with mock yet')
}

exports.handleIMadeThis = (recipeName) => {
  console.error('should not be editing with mock yet')
}

exports.handleRecipeVisit = (recipeName) => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

exports.manuallyUpdate = function (docName, field, value) {
  console.error('should not be manually updating with mock yet')
}

exports.getUsers = function () {
  return new Promise((resolve, reject) => {
    bcrypt.hash('my_pass', 2, function (err, hash) {
      resolve([
        { username: 'other_user', password: 'not my password' },
        { username: 'my_user', password: hash },
      ])
    })
  })
}
