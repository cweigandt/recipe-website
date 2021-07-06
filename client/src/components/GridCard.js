import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../styles/GridCard.css'

function GridCard(props) {
  const linkURL = '/recipe/' + props.name.replace(/ /g, '_')

  return (
    <Link to={linkURL} class='grid-card'>
      <img src={props.thumbnail} class='grid-card-image' alt={props.name} />
      <div class='grid-card-title'>{props.name}</div>
    </Link>
  )
}

GridCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
}

export default GridCard
