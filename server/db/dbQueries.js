const partial = require('partial')

const resolveWithDocDataArray = (resolve, snapshot) => {
  // snapshot.map isn't a function...
  var data = []
  snapshot.forEach((doc) => {
    data.push(doc.data())
  })
  resolve(data)
}

exports.doc = function (db, collectionName, docName) {
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
          // Nothing found
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

exports.allRecipes = function (db) {
  var promise = new Promise(function (resolve, reject) {
    const dbRes = db
      .collection('recipes')
      .orderBy('uploadTime', 'desc')
      .select(
        'name',
        'section',
        'tags',
        'thumbnail',
        'imageLocation',
        'uploadTime',
        'visits',
        'cookedDates'
      )
      .get()
      .then(partial(resolveWithDocDataArray, resolve))
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

exports.allFullRecipes = function (db) {
  var promise = new Promise(function (resolve, reject) {
    const dbRes = db
      .collection('recipes')
      .orderBy('uploadTime', 'desc')
      .get()
      .then(partial(resolveWithDocDataArray, resolve))
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

exports.delete = function (db, collectionName, docName) {
  var promise = new Promise(function (resolve, reject) {
    db.collection(collectionName)
      .doc(docName)
      .delete()
      .then(resolve)
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

exports.allRecipeNames = function (db) {
  var promise = new Promise(function (resolve, reject) {
    const dbRes = db
      .collection('recipes')
      .orderBy('uploadTime', 'desc')
      .select('name')
      .get()
      .then(partial(resolveWithDocDataArray, resolve))
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

exports.sectionRecipes = function (db, section) {
  var promise = new Promise(function (resolve, reject) {
    db.collection('recipes')
      .where('section', '==', section)
      .orderBy('uploadTime', 'desc')
      .select('name', 'uploadTime', 'section', 'imageLocation', 'thumbnail')
      .get()
      .then(partial(resolveWithDocDataArray, resolve))
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

exports.tagRecipes = function (db, tagName) {
  var promise = new Promise(function (resolve, reject) {
    db.collection('recipes')
      .where('tags', 'array-contains', tagName)
      .orderBy('uploadTime', 'desc')
      .select(
        'name',
        'uploadTime',
        'section',
        'imageLocation',
        'tags',
        'thumbnail'
      )
      .get()
      .then(partial(resolveWithDocDataArray, resolve))
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}

exports.allImages = function (db) {
  const promise = new Promise(function (resolve, reject) {
    db.collection('recipes')
      .orderBy('uploadTime', 'desc')
      .select('name', 'thumbnail')
      .get()
      .then(partial(resolveWithDocDataArray, resolve))
      .catch((err) => {
        reject(err)
      })
  })
  return promise
}
