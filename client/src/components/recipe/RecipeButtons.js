import { ReactComponent as PrintSVG } from '../../svg/print.svg'
import { ReactComponent as EditSVG } from '../../svg/edit.svg'
import { ReactComponent as JSONSVG } from '../../svg/json.svg'
import { Link } from 'react-router-dom'

const RecipeButtons = ({ isLoggedIn, recipe }) => {
  const renderEditButton = () => {
    return (
      isLoggedIn && (
        <Link
          to={{
            pathname: '/edit',
            state: { initialRecipeName: recipe.name },
          }}
          className='btn socialIcon'
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
        className='btn socialIcon'
        onClick={() => {
          window.navigator.clipboard.writeText(JSON.stringify(recipe, null, 2))
          return false
        }}
      >
        <JSONSVG />
      </div>
    )
  }

  return (
    <div id='socialButtons' className='noprint'>
      <div
        className='btn socialIcon'
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

export default RecipeButtons
