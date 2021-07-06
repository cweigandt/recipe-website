const Firestore = require('@google-cloud/firestore')

let dbHandle = null
const getDBHandle = function () {
  return (
    dbHandle ||
    new Firestore({
      projectId: 'recipe-website-269020',
      keyFilename: './server/credentials/firecloud-credentials.json',
    })
  )
}
dbHandle = getDBHandle()

exports.handleUploadForm = function (body, file, thumbnail) {
  const db = getDBHandle()

  let item = rinseInput(body, file, thumbnail)

  let recipesDoc = db.collection('recipes').doc(item.name)
  addToDatabase(recipesDoc, item)
}

exports.handleEditForm = function (body, file, thumbnail) {
  const db = getDBHandle()

  let item = rinseInput(body, file, thumbnail)
  if (item.imageLocation === '') {
    // When a user doesn't choose to update an image then use the one already stored
    delete item.imageLocation
    delete item.thumbnail
  }

  let recipesDoc = db.collection('recipes').doc(item.name)
  updateDatabase(recipesDoc, item)
}

exports.manuallyUpdate = function (docName, field, value) {
  const db = getDBHandle()

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

exports.getAllRecipes = function (disablePagination) {
  return requestAllRecipesFromDB(disablePagination)
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

var addToDatabase = function (doc, json) {
  console.log('Adding to database')
  console.log(json)
  doc.set(json)
}

var updateDatabase = function (doc, json) {
  console.log('Updating recipe in database')
  console.log(json)
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
    const db = getDBHandle()

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

/* 
Will give a limited list of recipes for pagination
Clients should then call requestPaginatedRecipesFromDB for more results
 */
var requestAllRecipesFromDB = function (disablePagination) {
  var promise = new Promise(function (resolve, reject) {
    const db = getDBHandle()

    const dbRes = db
      .collection('recipes')
      .orderBy('uploadTime', 'desc')
      .select('name', 'uploadTime', 'section', 'imageLocation', 'thumbnail')
      .limit(disablePagination ? 10000 : 20)
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
    const db = getDBHandle()

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

var requestPaginatedRecipesFromDB = function (startAfter) {
  var promise = new Promise(function (resolve, reject) {
    const db = getDBHandle()

    const dbRes = db
      .collection('recipes')
      .where('uploadTime', '<', parseInt(startAfter))
      .orderBy('uploadTime', 'desc')
      .select('name', 'uploadTime', 'section', 'imageLocation', 'thumbnail')
      .limit(20)
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
    const db = getDBHandle()

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
    const db = getDBHandle()

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
    const db = getDBHandle()

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
