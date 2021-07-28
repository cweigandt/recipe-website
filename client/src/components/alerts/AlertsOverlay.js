import React from 'react'
import { connect } from 'react-redux'

import Alert from './Alert'

const AlertsOverlay = (props) => {
  var { alerts } = props

  var renderAlerts = () => {
    return alerts.map((alert, i) => {
      return (
        <Alert alert={alert} isMostRecent={i === alerts.length - 1}></Alert>
      )
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
