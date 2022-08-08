import { useCallback, useRef, FormEventHandler } from 'react'
import { connect } from 'react-redux'

import '../../styles/modals/SignInModal.css'

import Modal from './Modal'

import { AlertType, ALERT_TYPES } from '../../constants/AlertTypes'
import { ReactComponent as XCircle } from '../../svg/x-circle.svg'
import { Dispatch } from 'redux'
import { RootState } from '../../reducers'
import alertSlice from '../../reducers/alerts'
import modalSlice from '../../reducers/modal'
import loginSlice from '../../reducers/login'

type Props = {
  dispatch: Dispatch
  id: number
  isLoggedIn: boolean
}

function SignInModal({ dispatch, id, isLoggedIn }: Props) {
  const formRef = useRef<HTMLFormElement>(null)

  if (isLoggedIn) {
    dispatch(modalSlice.actions.hideModal({ id }))
  }

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current!)

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
      let status: AlertType = ALERT_TYPES.SUCCESS
      if (response.status !== 200) {
        status = ALERT_TYPES.ERROR
        dispatch(
          alertSlice.actions.addAlert({
            text: 'Error logging in',
            style: status,
          })
        )
      } else {
        formRef.current && formRef.current.reset()
        dispatch(loginSlice.actions.logIn({}))
        dispatch(
          alertSlice.actions.addAlert({ text: 'Logged in', style: status })
        )
      }
    })
    return false
  }

  const handleClose = useCallback(() => {
    dispatch(modalSlice.actions.hideModal({ id }))
  }, [dispatch, id])

  return (
    <Modal class='sign-in-modal'>
      <div>Sign In</div>
      <div className='modal-close-button' onClick={handleClose}>
        <XCircle />
      </div>
      <form
        id='signInForm'
        name='signInForm'
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <div className='form-group'>
          <label htmlFor={'username'} className='form-label'>
            Username:
          </label>
          <input
            type='text'
            className='form-control'
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
        <div className='form-group'>
          <label htmlFor={'password'} className='form-label'>
            Password:
          </label>
          <input
            type='password'
            className='form-control'
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
          className='btn'
        >
          Submit
        </button>
      </form>
    </Modal>
  )
}

export default connect((state: RootState) => ({
  isLoggedIn: state.login.isLoggedIn,
}))(SignInModal)
