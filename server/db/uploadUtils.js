const convertNewlineInputToArray = function (input) {
  var output = input
  output = output.replace('\r\n', '\n')
  return splitAndTrim(output, '\n')
}

const splitAndTrim = function (str, splitItem) {
  var output = str.split(splitItem)
  return output
    .map(Function.prototype.call, String.prototype.trim)
    .filter((line) => {
      return line !== ''
    })
}

exports.rinseInput = function (json, imageFile, thumbnail) {
  const rinsedItem = {}

  let name = json.name
  rinsedItem.name = name.trim()
  if (/^[0-9]/.test(name)) {
    throw new Error('Name cannot start with a number')
  }
  if (/_/.test(name)) {
    throw new Error('Name cannot contain an underscore')
  }
  if (/[^-a-zA-Z0-9 ',()]/.test(name)) {
    throw new Error(
      `Name can only contain letters, numbers, parens, space ( ), hyphen (-), comma (,), and single quote (')`
    )
  }

  let section = json.section
  rinsedItem.section = section

  let servings = json.servings
  if (servings === '') {
    servings = '-'
  }
  rinsedItem.servings = servings
  if (/^[^0-9- ]/.test(servings)) {
    throw new Error('Servings must be empty, a number, a range, or -')
  }

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

  rinsedItem.uploadTime = parseInt(json.uploadTime, 10) || new Date().getTime()
  rinsedItem.visits = parseInt(json.visits, 10) || 0
  rinsedItem.cookedDates = json.cookedDates ? JSON.parse(json.cookedDates) : []

  return rinsedItem
}

exports.datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()
