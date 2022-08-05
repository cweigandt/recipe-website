export const SORT_TYPES = {
  UPLOAD: 'upload',
  VISITS: 'visits',
  COOKED_DATES: 'cooked-dates',
}

const sortByUpload = (recipes) => {
  return [...recipes].sort((a, b) => {
    return a.uploadTime - b.uploadTime
  })
}

const sortByVisits = (recipes) => {
  return [...recipes].sort((a, b) => {
    return b.visits - a.visits
  })
}

const sortByCookedDate = (recipes) => {
  return [...recipes].sort((a, b) => {
    const aCooked = a.cookedDates || []
    const bCooked = b.cookedDates || []

    if (aCooked.length === 0 && bCooked.length === 0) {
      return 0
    }

    if (aCooked.length === 0 && bCooked.length > 0) {
      return 1
    }

    if (aCooked.length > 0 && bCooked.length === 0) {
      return -1
    }

    return bCooked[0] - aCooked[0]
  })
}

export const sortByType = (type, recipes) => {
  switch (type) {
    case SORT_TYPES.UPLOAD:
      return sortByUpload(recipes)
    case SORT_TYPES.VISITS:
      return sortByVisits(recipes)
    case SORT_TYPES.COOKED_DATES:
      return sortByCookedDate(recipes)
    default:
      return recipes
  }
}
