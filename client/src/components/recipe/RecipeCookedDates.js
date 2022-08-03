import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/recipe/RecipeCookedDates.css'

const RecipeCookedDates = ({ dates }) => {
  if (!dates || dates.length === 0) {
    return null
  }

  const recentDate = new Date(dates[0] || dates)
  const formattedMonth = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(recentDate)
  const formattedYear = recentDate.getUTCFullYear()

  const totalTimes = dates.length || 1
  const suffix = totalTimes > 1 ? 'times' : 'time'
  return (
    <div className='cooked-dates'>
      Last made {formattedMonth} {formattedYear} ({totalTimes} {suffix})
    </div>
  )
}

RecipeCookedDates.propTypes = {
  cookedDates: PropTypes.array,
}

export default RecipeCookedDates
