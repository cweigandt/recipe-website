import React from 'react'
import { connect } from 'react-redux'

const withLoggedInVisibility = (WrappedComponent) => {
  return connect((state) => ({ isLoggedIn: state.login.isLoggedIn }))(
    (props) => {
      return props.isLoggedIn && <WrappedComponent {...props} />
    }
  )
}

export default withLoggedInVisibility
