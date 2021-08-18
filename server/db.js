const Firestore = require('@google-cloud/firestore')

const db = new Firestore({
  projectId: 'recipe-website-269020',
  keyFilename: './server/credentials/firecloud-credentials.json',
})

exports.handleUploadForm = function (body, file, thumbnail) {
  let item = rinseInput(body, file, thumbnail)

  let recipesDoc = db.collection('recipes').doc(item.name)
  addToDatabase(recipesDoc, item)
}

exports.handleEditForm = function (body, file, thumbnail) {
  let item = rinseInput(body, file, thumbnail)
  if (item.imageLocation === '') {
    // When a user doesn't choose to update an image then use the one already stored
    delete item.imageLocation
    delete item.thumbnail
  }

  let recipesDoc = db.collection('recipes').doc(item.name)
  updateDatabase(recipesDoc, item)
}

exports.handleIMadeThis = (recipeName) => {
  return requestDocFromDB('recipes', recipeName).then((recipeData) => {
    const cookedDates = recipeData.cookedDates || []
    const newCookedDates = [new Date().getTime(), ...cookedDates]

    const recipeDoc = db.collection('recipes').doc(recipeName)
    updateDatabase(recipeDoc, { cookedDates: newCookedDates })
  })
}

exports.manuallyUpdate = function (docName, field, value) {
  let item = {}
  item[field] = value

  let recipesDoc = db.collection('recipes').doc(docName)
  updateDatabase(recipesDoc, item)
}

exports.requestRecipe = function (recipeName) {
  return requestDocFromDB('recipes', recipeName)
}

exports.getSections = function () {
  return requestDocFromDB('global', 'sections')
}

exports.getAllRecipes = function () {
  return requestAllRecipesFromDB()
}

exports.getNamesOfRecipes = function () {
  return requestRecipeNamesFromDB()
}

exports.getSectionRecipes = function (section) {
  return requestSectionRecipesFromDB(section)
}

exports.getRecipesWithTag = function (tag) {
  return requestTagFromDB(tag)
}

exports.getRecipeImages = function () {
  return requestAllImagesFromDB()
}

exports.validateCredentials = function (credentials) {
  return validateCredentials(credentials)
}

var addToDatabase = function (doc, json) {
  doc.set(json)
}

var updateDatabase = function (doc, json) {
  doc.update(json)
}

var rinseInput = function (json, imageFile, thumbnail) {
  const rinsedItem = {}

  let name = json.name
  rinsedItem.name = name

  let section = json.section
  rinsedItem.section = section

  let servings = json.servings
  if (servings === '') {
    servings = '-'
  }
  rinsedItem.servings = servings

  let time = json.time
  rinsedItem.time = time

  let ingredients = json.ingredients
  ingredients = convertNewlineInputToArray(ingredients)
  rinsedItem.ingredients = ingredients

  let subIngredients1Name = json.subIngredients1Name
  rinsedItem.subIngredients1Name = subIngredients1Name

  let subIngredients1 = json.subIngredients1
  rinsedItem.subIngredients1 = convertNewlineInputToArray(subIngredients1)

  let subIngredients2Name = json.subIngredients2Name
  rinsedItem.subIngredients2Name = subIngredients2Name

  let subIngredients2 = json.subIngredients2
  rinsedItem.subIngredients2 = convertNewlineInputToArray(subIngredients2)

  let steps = json.steps
  steps = convertNewlineInputToArray(steps)
  rinsedItem.steps = steps

  let tags = json.tags
  tags = splitAndTrim(tags, ',')
  if (tags.length === 0 || tags[0].length === 0) {
    // No tags available
    tags = []
  }
  rinsedItem.tags = tags

  let uploader = json.uploader
  rinsedItem.uploader = uploader

  var imageLocation = ''
  if (imageFile) {
    imageLocation = imageFile.path
  }
  rinsedItem.imageLocation = imageLocation

  rinsedItem.thumbnail = thumbnail

  rinsedItem.uploadTime = new Date().getTime()

  return rinsedItem
}

var convertNewlineInputToArray = function (input) {
  var output = input
  output = output.replace('\r\n', '\n')
  return splitAndTrim(output, '\n')
}

var splitAndTrim = function (str, splitItem) {
  var output = str.split(splitItem)
  return output
    .map(Function.prototype.call, String.prototype.trim)
    .filter((line) => {
      return line !== ''
    })
}

var requestDocFromDB = function (collectionName, docName) {
  var promise = new Promise(function (resolve, reject) {
    // If docname provided then query that otherwise only query the entire collection
    db.collection(collectionName)
      .doc(docName)
      .get()
      .then((snapshot) => {
        let response = snapshot.data()
        if (response) {
          resolve(response)
        } else {
          // Nothing found not found
          reject(
            'Output not found for collection (' +
              collectionName +
              ') and doc (' +
              docName +
              ')'
          )
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

var requestAllRecipesFromDB = function () {
  var promise = new Promise(function (resolve, reject) {
    const dbRes = db
      .collection('recipes')
      .orderBy('uploadTime', 'desc')
      .get()
      .then((snapshot) => {
        // snapshot.map isn't a function...
        var data = []
        snapshot.forEach((doc) => {
          data.push(doc.data())
        })

        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

var requestRecipeNamesFromDB = function () {
  var promise = new Promise(function (resolve, reject) {
    const dbRes = db
      .collection('recipes')
      .orderBy('uploadTime', 'desc')
      .select('name')
      .get()
      .then((snapshot) => {
        // snapshot.map isn't a function...
        var data = []
        snapshot.forEach((doc) => {
          data.push(doc.data())
        })

        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

var requestSectionRecipesFromDB = function (section) {
  var promise = new Promise(function (resolve, reject) {
    db.collection('recipes')
      .where('section', '==', section)
      .orderBy('uploadTime', 'desc')
      .select('name', 'uploadTime', 'section', 'imageLocation', 'thumbnail')
      .get()
      .then((snapshot) => {
        // snapshot.map isn't a function...
        var data = []
        snapshot.forEach((doc) => {
          data.push(doc.data())
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

var requestTagFromDB = function (tagName) {
  var promise = new Promise(function (resolve, reject) {
    db.collection('recipes')
      .where('tags', 'array-contains', tagName)
      .orderBy('uploadTime', 'desc')
      .select('name', 'uploadTime', 'section', 'imageLocation', 'thumbnail')
      .get()
      .then((snapshot) => {
        // snapshot.map isn't a function...
        var data = []
        snapshot.forEach((doc) => {
          data.push(doc.data())
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

const requestAllImagesFromDB = function () {
  const promise = new Promise(function (resolve, reject) {
    db.collection('recipes')
      .orderBy('uploadTime', 'desc')
      .select('name', 'thumbnail')
      .get()
      .then((snapshot) => {
        // snapshot.map isn't a function...
        var data = []
        snapshot.forEach((doc) => {
          data.push(doc.data())
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
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
