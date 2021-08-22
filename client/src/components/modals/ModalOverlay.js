import React from 'react'
import { connect } from 'react-redux'

import * as ModalTypes from './ModalTypes'

import SignInModal from './SignInModal'
import AreYouSureModal from './AreYouSureModal'

const ModalOverlay = (props) => {
  var { modal } = props

  var renderModal = () => {
    // switch on modal type to show LoginModal, etc.
    if (modal.modal === ModalTypes.LOGIN) {
      return <SignInModal id={modal.id} />
    }

    if (modal.modal === ModalTypes.ARE_YOU_SURE) {
      return (
        <AreYouSureModal id={modal.id} additionalText={modal.additionalText} />
      )
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
