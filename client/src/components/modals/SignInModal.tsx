import { useCallback, useRef, FormEventHandler } from 'react'
import { connect } from 'react-redux'

import '../../styles/modals/SignInModal.css'

import Modal from './Modal'

import { addAlert } from '../../actions/alertsActions'
import { ALERT_TYPES } from '../alerts/Alert'
import { hideModal } from '../../actions/modalActions'
import { logIn } from '../../actions/loginActions'
import { ReactComponent as XCircle } from '../../svg/x-circle.svg'
import { Dispatch } from 'redux'

type Props = {
  dispatch: Dispatch
  id: number
  isLoggedIn: boolean
}

function SignInModal({ dispatch, id, isLoggedIn }: Props) {
  const formRef = useRef<HTMLFormElement>(null)

  if (isLoggedIn) {
    dispatch(hideModal(id))
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
      let status = ALERT_TYPES.SUCCESS
      if (response.status !== 200) {
        status = ALERT_TYPES.ERROR
        dispatch(addAlert('Error logging in', status))
      } else {
        formRef.current && formRef.current.reset()
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

export default connect((state: any) => ({
  isLoggedIn: state.login.isLoggedIn,
}))(SignInModal)
