import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '../../styles/alerts/Alert.css'
import { removeAlert } from '../../actions/alertsActions'
import { ReactComponent as XCircle } from '../../svg/x-circle.svg'
import withCSSAnimation from '../hoc/withCSSAnimation'

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  STATUS: 'status',
}

const SUCCESS_ALERT_TIMEOUT = 2000

function Alert({ alert, dispatch, isMostRecent = false }) {
  let timeout = null

  const handleClose = () => {
    clearTimeout(timeout)
    dispatch(removeAlert(alert.id))
  }

  if (alert.style === ALERT_TYPES.SUCCESS) {
    timeout = setTimeout(handleClose, SUCCESS_ALERT_TIMEOUT)
  }

  if (alert.style === ALERT_TYPES.STATUS && !isMostRecent) {
    dispatch(removeAlert(alert.id))
  }

  return (
    <div className={`alert ${alert.style}`} key={alert.id}>
      <div className='alert-close' onClick={handleClose}>
        <XCircle />
      </div>
      <div className='alert-text'>{alert.text}</div>
    </div>
  )
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
  isMostRecent: PropTypes.bool,
}

export default connect()(withCSSAnimation(Alert, { timeout: 300 }))
