import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/widgets/FlipCard.css'

function FlipCard({ front, back, classes }) {
  return (
    <div className={`flip-card ${classes}`}>
      <div className='flip-card-inner'>
        <div className='flip-card-front'>{front}</div>
        <div className='flip-card-back'>{back}</div>
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
