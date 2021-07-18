import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '../../styles/Alert.css'
import { removeAlert } from '../../actions/alertsActions'

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
}

function Alert({ alert, dispatch }) {
  let timeout = null

  const handleClose = () => {
    clearTimeout(timeout)
    dispatch(removeAlert(alert.id))
  }

  if (alert.style === ALERT_TYPES.SUCCESS) {
    timeout = setTimeout(handleClose, 4000)
  }

  return (
    <div class={`alert ${alert.style}`} key={alert.id}>
      <div class='alert-close' onClick={handleClose}>
        <i class='fa fa-times-circle'></i>
      </div>
      <div class='alert-text'>{alert.text}</div>
    </div>
  )
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
}

export default connect()(Alert)
