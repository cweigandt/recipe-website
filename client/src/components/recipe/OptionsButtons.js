import { connect } from 'react-redux'

import { ReactComponent as PrintSVG } from '../../svg/print.svg'
import { ReactComponent as EditSVG } from '../../svg/edit.svg'
import { ReactComponent as JSONSVG } from '../../svg/json.svg'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import '../../styles/recipe/OptionsButtons.css'
import { addAlert } from '../../actions/alertsActions'
import { ALERT_TYPES } from '../../constants/AlertTypes'

const BUTTON_CLASSES = 'btn options-icon'

const OptionsButtons = ({ dispatch, isLoggedIn, recipe }) => {
  const renderEditButton = () => {
    return (
      isLoggedIn && (
        <Link
          to={{
            pathname: '/edit',
            state: { initialRecipeName: recipe.name },
          }}
          className={BUTTON_CLASSES}
          data-test-id='edit-button'
        >
          <EditSVG />
        </Link>
      )
    )
  }

  const renderJSONButton = () => {
    return (
      <div
        className={BUTTON_CLASSES}
        data-test-id='json-button'
        onClick={() => {
          const recipeText = JSON.stringify(recipe, null, 2)
          window.navigator.clipboard.writeText(recipeText).then(
            () => {
              dispatch(
                addAlert(`JSON copied to clipboard`, ALERT_TYPES.SUCCESS)
              )
            },
            () => {
              addAlert('Unable to write to clipboard', ALERT_TYPES.ERROR)
            }
          )
          return false
        }}
      >
        <JSONSVG />
      </div>
    )
  }

  return (
    <div id='optionsButtons' className='noprint'>
      <div
        className={BUTTON_CLASSES}
        onClick={() => {
          window.print()
          return false
        }}
      >
        <PrintSVG />
      </div>
      {renderJSONButton()}
      {renderEditButton()}
    </div>
  )
}

OptionsButtons.propTypes = {
  dispatch: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  recipe: PropTypes.object.isRequired,
}

export default connect((state) => ({ isLoggedIn: state.login.isLoggedIn }))(
  OptionsButtons
)
