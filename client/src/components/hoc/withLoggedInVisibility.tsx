import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../reducers'

type Props = {
  isLoggedIn: boolean
}

const withLoggedInVisibility = (WrappedComponent: React.FC<any>) => {
  return connect((state: RootState) => ({
    isLoggedIn: state.login.isLoggedIn,
  }))((props: Props) => {
    return props.isLoggedIn ? <WrappedComponent {...props} /> : null
  })
}

export default withLoggedInVisibility
