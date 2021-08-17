import React, { useState } from 'react'
import PropTypes from 'prop-types'

import withLoggedInVisibility from '../hoc/withLoggedInVisibility'

import '../../styles/RecipeMadeButton.css'

const RecipeMadeButton = ({ recipeName, cookedDates }) => {
  const [showButton, setShowButton] = useState(true)

  const handleButtonClick = () => {
    // Help avoid accidental double clicks
    setShowButton(false)

    fetch('/i-made-dis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipeName,
      }),
    })
  }

  if (cookedDates) {
    const today = new Date()
    const recent = new Date(cookedDates[0])

    const msDiff = today - recent
    const numDaysDiff = msDiff / 1000 / 60 / 60 / 24

    if (numDaysDiff < 1) {
      // For the rest of the day, you can't say you've made this again
      return null
    }
  }

  return (
    showButton && (
      <button id='iMadeThis' onClick={handleButtonClick}>
        I made this today
      </button>
    )
  )
}

RecipeMadeButton.propTypes = {
  recipeName: PropTypes.string.isRequired,
  cookedDates: PropTypes.array,
}

export default withLoggedInVisibility(RecipeMadeButton)
