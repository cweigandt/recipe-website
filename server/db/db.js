const Firestore = require('@google-cloud/firestore')

const Queries = require('./dbQueries')
const { datesAreOnSameDay, rinseInput } = require('./uploadUtils')

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
  return recipesDoc.set(item)
}

exports.handleEditForm = async function (body, file, thumbnail) {
  let item = rinseInput(body, file, thumbnail)
  if (item.imageLocation === '') {
    // When a user doesn't choose to update an image then use the one already stored
    delete item.imageLocation
    delete item.thumbnail
  }

  if (body.oldName && body.oldName !== '') {
    // If there was a name change then treat this as an upload and delete the old name
    return Queries.doc(db, 'recipes', body.oldName).then((oldRecipe) => {
      item.imageLocation = oldRecipe.imageLocation
      item.thumbnail = oldRecipe.thumbnail

      const recipesDoc = getDBRecipe(db, item.name)
      return recipesDoc.set(item).then(() => {
        return Queries.delete(db, 'recipes', body.oldName)
      })
    })
  }

  const recipesDoc = getDBRecipe(db, item.name)

  return recipesDoc.update(item)
}

exports.handleIMadeThis = (recipeName) => {
  return Queries.doc(db, 'recipes', recipeName).then((recipeData) => {
    const cookedDates = recipeData.cookedDates || []

    if (
      cookedDates.length > 0 &&
      datesAreOnSameDay(new Date(cookedDates[0]), new Date())
    ) {
      return Promise.resolve()
    }

    const newCookedDates = [new Date().getTime(), ...cookedDates]

    const recipeDoc = getDBRecipe(db, recipeName)
    return recipeDoc.update({ cookedDates: newCookedDates })
  })
}

exports.handleRecipeVisit = (recipeName) => {
  return Queries.doc(db, 'recipes', recipeName).then((recipeData) => {
    const visits = recipeData.visits || 0
    const newVisits = visits + 1

    const recipeDoc = getDBRecipe(db, recipeName)
    return recipeDoc.update({ visits: newVisits })
  })
}

exports.handleTagRename = (fromTag, toTag) => {
  getRecipesWithTag(fromTag).then((recipes) => {
    recipes.forEach((recipe) => {
      const recipeDoc = getDBRecipe(db, recipe.name)
      const newTags = recipe.tags
      const index = recipe.tags.indexOf(fromTag)
      if (!index) {
        // shouldn't be possible
        return
      }
      newTags[index] = toTag
      await recipeDoc.update({ tags: newTags })
    })
  })
}

exports.manuallyUpdate = function (docName, field, value) {
  let item = {}
  item[field] = value

  let recipesDoc = getDBRecipe(db, docName)
  return recipesDoc.update(item)
}

exports.getUsers = () => {
  const promise = new Promise(function (resolve, reject) {
    db.collection('users')
      .get()
      .then((snapshot) => {
        let users = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          users.push({ username: data.username, password: data.password })
        })
        resolve(users)
      })
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}
