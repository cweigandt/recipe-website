import React from 'react'
import PropTypes from 'prop-types'

import withLoggedInVisibility from '../hoc/withLoggedInVisibility'

import '../../styles/RecipeMadeButton.css'

const RecipeMadeButton = ({ recipeName }) => {
  const handleButtonClick = () => {
    fetch('/i-made-dis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipeName,
      }),
    })
  }

  return (
    <button id='iMadeThis' onClick={handleButtonClick}>
      I made this today
    </button>
  )
}

RecipeMadeButton.propTypes = {
  recipeName: PropTypes.string.isRequired,
}

export default withLoggedInVisibility(RecipeMadeButton)
