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
    <Modal className='are-you-sure-modal'>
      <h4 style={{ margin: '20px' }}>Are you sure?</h4>
      <div style={{ 'font-size': '16px', 'font-style': 'italic' }}>
        {props.additionalText}
      </div>
      <form
        id='areYouSureForm'
        name='areYouSureForm'
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <button
          type='button'
          onClick={handleClose}
          data-test-id='are-you-sure-close'
          id='areYouSureCancel'
          className='btn'
        >
          Cancel
        </button>
        <button
          type='submit'
          id='areYouSureSubmit'
          data-test-id='are-you-sure-submit'
          className='btn'
        >
          Confirm
        </button>
      </form>
    </Modal>
  )
}

AreYouSureModal.propTypes = {
  id: PropTypes.number.isRequired,
  additionalText: PropTypes.string,
}

AreYouSureModal.defaultProps = {}

export default connect()(AreYouSureModal)
