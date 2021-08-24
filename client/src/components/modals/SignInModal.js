import React, { useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import '../../styles/modals/SignInModal.css'

import Modal from './Modal'

import { addAlert } from '../../actions/alertsActions'
import { ALERT_TYPES } from '../alerts/Alert'
import { hideModal } from '../../actions/modalActions'
import { logIn } from '../../actions/loginActions'

function SignInModal({ dispatch, id, isLoggedIn }) {
  const formRef = useRef(null)

  if (isLoggedIn) {
    dispatch(hideModal(id))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    fetch('/signin', {
      method: 'POST',
      redirect: 'manual',
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      let status = ALERT_TYPES.SUCCESS
      if (response.status !== 200) {
        status = ALERT_TYPES.ERROR
        dispatch(addAlert('Error logging in', status))
      } else {
        formRef.current.reset()
        dispatch(logIn())
        dispatch(addAlert('Logged in', status))
      }
    })
    return false
  }

  const handleClose = useCallback(() => {
    dispatch(hideModal(id))
  }, [dispatch, id])

  return (
    <Modal class='sign-in-modal'>
      <div>Sign In</div>
      <div class='modal-close-button' onClick={handleClose}>
        ❌
      </div>
      <form
        id='signInForm'
        name='signInForm'
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <div class='form-group'>
          <label for={'username'} class='form-label'>
            Username:
          </label>
          <input
            type='text'
            class='form-control'
            data-test-id='login-username'
            id='username'
            onKeyDown={(e) => {
              if (e.keyCode === 13 || e.key === 'Enter') {
                e.preventDefault()
                return false
              }
            }}
            name='username'
          />
        </div>
        <div class='form-group'>
          <label for={'password'} class='form-label'>
            Password:
          </label>
          <input
            type='password'
            class='form-control'
            data-test-id='login-password'
            id='password'
            onKeyDown={(e) => {
              if (e.keyCode === 13 || e.key === 'Enter') {
                e.preventDefault()
                return false
              }
            }}
            name='password'
          />
        </div>
        <button
          type='submit'
          id='signOnSubmit'
          data-test-id='login-submit'
          class='btn'
        >
          Submit
        </button>
      </form>
    </Modal>
  )
}

SignInModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

export default connect((state) => ({ isLoggedIn: state.login.isLoggedIn }))(
  SignInModal
)
