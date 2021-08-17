import React from 'react'

import withLoggedInVisibility from '../hoc/withLoggedInVisibility'

import '../../styles/RecipeMadeButton.css'

function RecipeMadeButton(props) {
  return <button>I made dis</button>
}

export default withLoggedInVisibility(RecipeMadeButton)
