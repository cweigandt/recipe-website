import React from 'react'

import '../../styles/modals/Modal.css'

const Modal = (props) => {
  return (
    <div class='modal-bg'>
      <div class={`modal ${props.class}`}>{props.children}</div>
    </div>
  )
}

export default Modal
