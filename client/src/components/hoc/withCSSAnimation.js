import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

const withCSSAnimation = (WrappedElement) => {
  return ({ cssPrefix, timeout = 500 }) => {
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
      setTimeout(() => setMounted(true), 0)
    }, [])

    return (
      <CSSTransition in={isMounted} classNames={cssPrefix} timeout={timeout}>
        {WrappedElement}
      </CSSTransition>
    )
  }
}

export default withCSSAnimation
