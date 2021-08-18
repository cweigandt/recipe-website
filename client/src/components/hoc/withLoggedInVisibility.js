import React from 'react'
import { useCookies } from 'react-cookie'

function withLoggedInVisibility(WrappedComponent) {
  return (props) => {
    const [cookies] = useCookies(['user'])
    if (!cookies['token']) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withLoggedInVisibility
