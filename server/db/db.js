const Firestore = require('@google-cloud/firestore')

const Queries = require('./dbQueries')
const { rinseInput } = require('./uploadUtils')

const db = new Firestore({
  projectId: 'recipe-website-269020',
  keyFilename: './server/credentials/firecloud-credentials.json',
})

exports.requestRecipe = function (recipeName) {
  return Queries.doc(db, 'recipes', recipeName)
}

exports.getSections = function () {
  return Queries.doc(db, 'global', 'sections').then(
    (sectionsData) => sectionsData.data
  )
}

exports.getAllRecipes = function () {
  return Queries.allRecipes(db)
}

exports.getNamesOfRecipes = function () {
  return Queries.allRecipeNames(db)
}

exports.getSectionRecipes = function (section) {
  return Queries.sectionRecipes(db, section)
}

exports.getRecipesWithTag = function (tag) {
  return Queries.tagRecipes(db, tag)
}

exports.getRecipeImages = function () {
  return Queries.allImages(db)
}

const getDBRecipe = (db, name) => {
  return db.collection('recipes').doc(name)
}

exports.handleUploadForm = function (body, file, thumbnail) {
  let item = rinseInput(body, file, thumbnail)

  let recipesDoc = getDBRecipe(db, item.name)
  recipesDoc.set(item)
}

exports.handleEditForm = function (body, file, thumbnail) {
  let item = rinseInput(body, file, thumbnail)
  if (item.imageLocation === '') {
    // When a user doesn't choose to update an image then use the one already stored
    delete item.imageLocation
    delete item.thumbnail
  }

  let recipesDoc = getDBRecipe(db, item.name)
  recipesDoc.update(item)
}

exports.handleIMadeThis = (recipeName) => {
  return Queries.doc(db, 'recipes', recipeName).then((recipeData) => {
    const cookedDates = recipeData.cookedDates || []
    const newCookedDates = [new Date().getTime(), ...cookedDates]

    const recipeDoc = getDBRecipe(db, recipeName)
    recipeDoc.update({ cookedDates: newCookedDates })
  })
}

exports.manuallyUpdate = function (docName, field, value) {
  let item = {}
  item[field] = value

  let recipesDoc = getDBRecipe(db, docName)
  recipesDoc.update(item)
}

const validateCredentials = (credentials) => {
  const promise = new Promise(function (resolve, reject) {
    db.collection('users')
      .get()
      .then((snapshot) => {
        const { username, password } = credentials
        let found = false
        snapshot.forEach((doc) => {
          const data = doc.data()
          const docUsername = data.username
          const docPassword = data.password
          if (docUsername === username && docPassword === password) {
            resolve(username)
            found = true
          }
        })
        if (!found) {
          reject(username)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

exports.validateCredentials = function (credentials) {
  return validateCredentials(credentials)
}
