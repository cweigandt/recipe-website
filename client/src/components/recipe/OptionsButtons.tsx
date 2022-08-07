import { connect } from 'react-redux'

import { ReactComponent as PrintSVG } from '../../svg/print.svg'
import { ReactComponent as EditSVG } from '../../svg/edit.svg'
import { ReactComponent as JSONSVG } from '../../svg/json.svg'
import { Link } from 'react-router-dom'

import '../../styles/recipe/OptionsButtons.css'
import { addAlert } from '../../actions/alertsActions'
import { ALERT_TYPES } from '../../constants/AlertTypes'
import { Dispatch } from 'redux'
import { FullRecipe } from '../../types/RecipeTypes'
import { RootState } from '../../reducers'

const BUTTON_CLASSES = 'btn options-icon'

type Props = {
  dispatch: Dispatch
  isLoggedIn: boolean
  recipe: FullRecipe
}

const OptionsButtons = ({ dispatch, isLoggedIn, recipe }: Props) => {
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

export default connect((state: RootState) => ({
  isLoggedIn: state.login.isLoggedIn,
}))(OptionsButtons)
