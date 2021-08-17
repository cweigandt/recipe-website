import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/RecipeCookedDates.css'

const RecipeCookedDates = ({ dates }) => {
  if (!dates) {
    return null
  }

  const recentDate = new Date(dates[0])
  const formattedMonth = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(recentDate)
  const formattedYear = recentDate.getUTCFullYear()

  const totalTimes = dates.length
  const suffix = totalTimes > 1 ? 'times' : 'time'
  return (
    <div class='cooked-dates'>
      Last made {formattedMonth} {formattedYear} ({totalTimes} {suffix})
    </div>
  )
}

RecipeCookedDates.propTypes = {
  cookedDates: PropTypes.array,
}

export default RecipeCookedDates
