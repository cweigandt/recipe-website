import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '../../styles/alerts/Alert.css'
import { removeAlert } from '../../actions/alertsActions'
import { ReactComponent as XCircle } from '../../svg/x-circle.svg'

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  STATUS: 'status',
}

function Alert({ alert, dispatch, isMostRecent = false }) {
  let timeout = null

  const handleClose = () => {
    clearTimeout(timeout)
    dispatch(removeAlert(alert.id))
  }

  if (alert.style === ALERT_TYPES.SUCCESS) {
    timeout = setTimeout(handleClose, 4000)
  }

  if (alert.style === ALERT_TYPES.STATUS && !isMostRecent) {
    dispatch(removeAlert(alert.id))
  }

  return (
    <div class={`alert ${alert.style}`} key={alert.id}>
      <div class='alert-close' onClick={handleClose}>
        <XCircle />
      </div>
      <div class='alert-text'>{alert.text}</div>
    </div>
  )
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
  isMostRecent: PropTypes.bool,
}

export default connect()(Alert)
