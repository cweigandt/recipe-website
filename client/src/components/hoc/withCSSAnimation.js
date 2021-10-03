import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

const withCSSAnimation = (
  WrappedComponent,
  { cssPrefix = 'animation', timeout = 500 } = {}
) => {
  return (props) => {
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
      setTimeout(() => setMounted(true), 0)
      return () => setMounted(false)
    }, [])

    return (
      <CSSTransition in={isMounted} classNames={cssPrefix} timeout={timeout}>
        <WrappedComponent {...props} />
      </CSSTransition>
    )
  }
}

export default withCSSAnimation
