import { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import withLoggedInVisibility from '../hoc/withLoggedInVisibility'

import * as ModalTypes from '../../constants/ModalTypes'

import '../../styles/recipe/RecipeMadeButton.css'
import { Dispatch } from 'redux'
import { RootState } from '../../reducers'
import { Datenum } from '../../types/Aliases'
import modalSlice, { generateUniqueId } from '../../reducers/modal'

let modalId = -1

type Props = {
  confirmedAreYouSureIds: number[]
  recipeName: string
  cookedDates: Datenum[]
  dispatch: Dispatch
}

const RecipeMadeButton = ({
  confirmedAreYouSureIds,
  recipeName,
  cookedDates,
  dispatch,
}: Props) => {
  const [showButton, setShowButton] = useState(true)

  const handleButtonClick = useCallback(() => {
    modalId = generateUniqueId()
    const action = modalSlice.actions.showModal({
      modal: ModalTypes.ARE_YOU_SURE,
      id: modalId,
      additionalText: 'Did you really make this today?',
    })
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

    const msDiff = today.getTime() - recent.getTime()
    const numDaysDiff = msDiff / 1000 / 60 / 60 / 24

    if (numDaysDiff < 1) {
      // For the rest of the day, you can't say you've made this again
      return null
    }
  }

  return (
    showButton && (
      <button
        id='iMadeThis'
        data-test-id='i-made-this-button'
        onClick={handleButtonClick}
      >
        I made this today
      </button>
    )
  )
}

const mapStateToProps = (state: RootState) => ({
  confirmedAreYouSureIds: state.modal.confirmedAreYouSureIds,
})
export default connect(mapStateToProps)(
  // @ts-expect-error no idea
  withLoggedInVisibility(RecipeMadeButton)
)
