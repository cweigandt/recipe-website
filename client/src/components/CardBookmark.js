import React from 'react'
import PropTypes from 'prop-types'

import '../styles/CardBookmark.css'

export const BOOKMARK_TYPES = {
  NEW: 'new',
  INFO: 'info',
}

function CardBookmark(props) {
  return <div class={`card-bookmark ${props.type || ''}`}>{props.text}</div>
}

CardBookmark.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.instanceOf(BOOKMARK_TYPES),
}

export default CardBookmark
