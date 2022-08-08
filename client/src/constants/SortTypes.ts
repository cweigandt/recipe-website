export const SORT_TYPES = {
  UPLOAD: 'upload',
  VISITS: 'visits',
  COOKED_DATES: 'cooked-dates',
}

export type SortType = typeof SORT_TYPES[keyof typeof SORT_TYPES]
