import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '../../styles/SignInModal.css'

import { addAlert } from '../../actions/alertsActions'
import { ALERT_TYPES } from '../alerts/Alert'
import { hideModal } from '../../actions/modalActions'

function SignInModal(props) {
  const formRef = useRef(null)

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
        props.dispatch(addAlert('Error logging in', status))
      } else {
        formRef.current.reset()
        props.dispatch(hideModal())
        props.dispatch(addAlert('Logged in', status))
      }
    })
    return false
  }

  return (
    <div class='modal-bg'>
      <div class='sign-in-modal'>
        <div>Sign In</div>
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
              type='text'
              class='form-control'
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
          <button type='submit' id='signOnSubmit' class='btn'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

SignInModal.propTypes = {}

SignInModal.defaultProps = {}

export default connect()(SignInModal)
