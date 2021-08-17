import React from 'react'
import { connect } from 'react-redux'
import SignInModal from './SignInModal'
import * as ModalTypes from './ModalTypes'

const ModalOverlay = (props) => {
  var { modal } = props

  var renderModal = () => {
    // switch on modal type to show LoginModal, etc.
    if (modal.modal === ModalTypes.LOGIN) {
      return <SignInModal />
    }
  }

  return <div className='modal-overlay'>{renderModal()}</div>
}

const mapModalToProps = (state) => {
  return {
    modal: state.modal,
  }
}

export default connect(mapModalToProps)(ModalOverlay)
