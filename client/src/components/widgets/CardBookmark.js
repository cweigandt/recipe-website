import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/widgets/CardBookmark.css'

export const BOOKMARK_TYPES = {
  NEW: 'new',
  INFO: 'info',
  STAR: 'star',
}

const CardBookmark = (props) => {
  return (
    <div className={`card-bookmark ${props.type || ''}`}>{props.children}</div>
  )
}

CardBookmark.propTypes = {
  type: PropTypes.instanceOf(BOOKMARK_TYPES),
}

export default CardBookmark
