import React from 'react'

import '../../styles/modals/Modal.css'

const Modal = (props) => {
  return (
    <div className='modal-bg'>
      <div className={`modal ${props.class}`}>{props.children}</div>
    </div>
  )
}

export default Modal
