import { FormEventHandler, useRef } from 'react'
import { connect } from 'react-redux'

import '../../styles/modals/AreYouSureModal.css'

import Modal from './Modal'
import { confirmAreYouSure, hideModal } from '../../actions/modalActions'
import { Dispatch } from 'redux'

type Props = {
  dispatch: Dispatch
  id: number
  additionalText: string
}

const AreYouSureModal = (props: Props) => {
  const formRef = useRef(null)

  const handleClose = () => {
    props.dispatch(hideModal(props.id))
  }

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    props.dispatch(confirmAreYouSure(props.id))

    handleClose()
    return false
  }

  return (
    <Modal class='are-you-sure-modal'>
      <h4 style={{ margin: '20px' }}>Are you sure?</h4>
      <div style={{ fontSize: '16px', fontStyle: 'italic' }}>
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

export default connect()(AreYouSureModal)
