import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import withLoggedInVisibility from '../hoc/withLoggedInVisibility'

import { showModal } from '../../actions/modalActions'
import * as ModalTypes from '../modals/ModalTypes'

import '../../styles/RecipeMadeButton.css'

let modalId = -1

const RecipeMadeButton = ({
  confirmedAreYouSureIds,
  recipeName,
  cookedDates,
  dispatch,
}) => {
  const [showButton, setShowButton] = useState(true)

  const handleButtonClick = useCallback(() => {
    const action = showModal(ModalTypes.ARE_YOU_SURE)
    modalId = action.id
    dispatch(action)
  }, [dispatch])

  useEffect(() => {
    if (!confirmedAreYouSureIds.includes(modalId)) {
      return
    }

    modalId = -1
    // Help avoid accidental double clicks
    setShowButton(false)
    fetch('/i-made-dis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipeName,
      }),
    })
  }, [confirmedAreYouSureIds, setShowButton, recipeName])

  if (cookedDates) {
    const today = new Date()
    const recent = new Date(cookedDates[0])

    const msDiff = today - recent
    const numDaysDiff = msDiff / 1000 / 60 / 60 / 24

    if (numDaysDiff < 1) {
      // For the rest of the day, you can't say you've made this again
      return null
    }
  }

  return (
    showButton && (
      <button id='iMadeThis' onClick={handleButtonClick}>
        I made this today
      </button>
    )
  )
}

RecipeMadeButton.propTypes = {
  confirmedAreYouSureIds: PropTypes.array.isRequired,
  recipeName: PropTypes.string.isRequired,
  cookedDates: PropTypes.array,
}

const mapStateToProps = (state) => ({
  confirmedAreYouSureIds: state.modal.confirmedAreYouSureIds,
})
export default connect(mapStateToProps)(
  withLoggedInVisibility(RecipeMadeButton)
)
