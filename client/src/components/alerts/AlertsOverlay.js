import React from 'react'
import { connect } from 'react-redux'

import Alert from './Alert'

const AlertsOverlay = (props) => {
  var { alerts } = props

  var renderAlerts = function () {
    return alerts.map(function (alert) {
      return <Alert alert={alert}></Alert>
    })
  }

  return <div className='alerts-overlay'>{renderAlerts()}</div>
}

const mapAlertsToProps = (state) => {
  return {
    alerts: state.alerts,
  }
}

export default connect(mapAlertsToProps)(AlertsOverlay)
