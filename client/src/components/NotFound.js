import React from 'react'

import '../styles/NotFound.css'

function GridCard(props) {
  return (
    <div class='container'>
      <div class='row'>
        <div class='col-md-12'>
          <div class='error-wrapper'>
            <h1>Oops</h1>
            <h2>That page doesn't exist</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GridCard
