import React from 'react'

import '../../styles/widgets/CardBookmark.css'

export const BOOKMARK_TYPES = {
  NEW: 'new',
  INFO: 'info',
  STAR: 'star',
}

type Props = {
  type: typeof BOOKMARK_TYPES[keyof typeof BOOKMARK_TYPES]
  children?: React.ReactNode
}

const CardBookmark = (props: Props) => {
  return (
    <div className={`card-bookmark ${props.type || ''}`}>{props.children}</div>
  )
}

export default CardBookmark
