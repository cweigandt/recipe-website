import { connect } from 'react-redux'

import '../../styles/alerts/Alert.css'
import { removeAlert } from '../../actions/alertsActions'
import { ReactComponent as XCircle } from '../../svg/x-circle.svg'
import withCSSAnimation from '../hoc/withCSSAnimation'
import { AlertType } from '../../types/AlertTypes'
import { Dispatch } from 'redux'

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  STATUS: 'status',
}

const SUCCESS_ALERT_TIMEOUT = 2000

type PropsType = {
  alert: AlertType
  dispatch: Dispatch
  isMostRecent: boolean
}

function Alert({ alert, dispatch, isMostRecent = false }: PropsType) {
  let timeout: NodeJS.Timeout | undefined = undefined

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
    <div className={`alert ${alert.style}`} key={alert.id} data-test-id='alert'>
      <div
        className='alert-close'
        onClick={handleClose}
        data-test-id='alert-close'
      >
        <XCircle />
      </div>
      <div className='alert-text'>{alert.text}</div>
    </div>
  )
}

export default connect()(withCSSAnimation(Alert, { timeout: 300 }))
