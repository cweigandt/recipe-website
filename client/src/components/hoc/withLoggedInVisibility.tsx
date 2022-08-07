import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../reducers'

function withLoggedInVisibility<T>(WrappedComponent: React.ComponentType<T>) {
  type LoggedInProps = {
    isLoggedIn: boolean
  }

  const Comp = (props: LoggedInProps & T) => {
    return props.isLoggedIn ? <WrappedComponent {...props} /> : null
  }

  return connect((state: RootState) => ({
    isLoggedIn: state.login.isLoggedIn,
    // @ts-expect-error no idea
  }))(Comp)
}

export default withLoggedInVisibility
