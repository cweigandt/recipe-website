import React, { useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import '../../styles/modals/AreYouSureModal.css'

import Modal from './Modal'
import { confirmAreYouSure, hideModal } from '../../actions/modalActions'

const AreYouSureModal = (props) => {
  const formRef = useRef(null)

  const handleFormSubmit = (e) => {
    e.preventDefault()

    props.dispatch(confirmAreYouSure(props.id))

    handleClose(e)
    return false
  }

  const handleClose = (e) => {
    props.dispatch(hideModal(props.id))
  }

  return (
    <Modal class='are-you-sure-modal'>
      <div>Are you sure?</div>
      <form
        id='areYouSureForm'
        name='areYouSureForm'
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <button
          type='button'
          onClick={handleClose}
          id='areYouSureCancel'
          class='btn'
        >
          Cancel
        </button>
        <button type='submit' id='areYouSureSubmit' class='btn'>
          Confirm
        </button>
      </form>
    </Modal>
  )
}

AreYouSureModal.propTypes = {
  id: PropTypes.number.isRequired,
}

AreYouSureModal.defaultProps = {}

export default connect()(AreYouSureModal)
