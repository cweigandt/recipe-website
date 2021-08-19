import React from 'react'

import '../../styles/widgets/Badge.css'

function Badge(props) {
  return <div class='badge badge-primary'>{props.children}</div>
}

export default Badge
