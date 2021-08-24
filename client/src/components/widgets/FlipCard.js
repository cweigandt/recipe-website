import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/widgets/FlipCard.css'

function FlipCard({ front, back, classes }) {
  return (
    <div class={`flip-card ${classes}`}>
      <div class='flip-card-inner'>
        <div class='flip-card-front'>{front}</div>
        <div class='flip-card-back'>{back}</div>
      </div>
    </div>
  )
}

FlipCard.propTypes = {
  front: PropTypes.node.isRequired,
  back: PropTypes.node.isRequired,
  classes: PropTypes.string,
}

export default FlipCard
