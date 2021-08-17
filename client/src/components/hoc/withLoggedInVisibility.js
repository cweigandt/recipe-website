import React from 'react'
import { useCookies } from 'react-cookie'

function withLoggedInVisibility(WrappedComponent) {
  return (props) => {
    const [cookies] = useCookies(['user'])

    return cookies['token'] && <WrappedComponent {...props} />
  }
}

export default withLoggedInVisibility
