import { connect } from 'react-redux'

import Alert from './Alert'
import { AlertType } from '../../types/AlertTypes'

interface PropsType {
  alerts: AlertType[]
}
const AlertsOverlay = ({ alerts }: PropsType) => {
  var renderAlerts = () => {
    return alerts.map((alert, i) => {
      return (
        <Alert alert={alert} isMostRecent={i === alerts.length - 1}></Alert>
      )
    })
  }

  return <div className='alerts-overlay'>{renderAlerts()}</div>
}

const mapAlertsToProps = (state: any) => {
  return {
    alerts: state.alerts,
  }
}

export default connect(mapAlertsToProps)(AlertsOverlay)
