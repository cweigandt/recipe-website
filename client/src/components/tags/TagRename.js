import { useCallback, useRef, useState } from 'react'
import Tags from '@yaireo/tagify/dist/react.tagify'
import TagsList from './TagsList'
import { ReactComponent as ChevronsRight } from '../../svg/chevrons-right.svg'
import { ALERT_TYPES } from '../alerts/Alert'
import { addAlert } from '../../actions/alertsActions'

import '../../styles/tags/TagRename.css'
import { useDispatch } from 'react-redux'
import withRecipes from '../hoc/withRecipes'

const TagRename = ({ recipes }) => {
  const tagifyRef = useRef(null)
  const dispatch = useDispatch()

  const [fromBadge, setFromBadge] = useState(' ')
  const [submitClickable, setSubmitClickable] = useState(true)

  const handleBadgeClick = useCallback((tag) => {
    setFromBadge(tag)
  }, [])

  const handleSubmit = useCallback(() => {
    if (fromBadge === ' ' || tagifyRef.current.value.length === 0) {
      // something isn't filled in
      dispatch(
        addAlert(
          `Both a 'source' badge and a 'destination' badge must be filled in`,
          ALERT_TYPES.ERROR
        )
      )
      return
    }

    const toBadge = tagifyRef.current.value[0].value

    setSubmitClickable(false)

    fetch('/rename-tag', {
      method: 'POST',
      redirect: 'manual',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromTag: fromBadge, toTag: toBadge }),
    }).then((response) => {
      setSubmitClickable(true)
      if (response.status === 401) {
        dispatch(addAlert('User not logged in', ALERT_TYPES.ERROR))
        return
      }
      response.json().then((data) => {
        let status = ALERT_TYPES.SUCCESS
        if (response.status !== 200) {
          status = ALERT_TYPES.ERROR
          console.log(data.stack)
        }

        dispatch(addAlert(data.response, status))
      })
    })
  }, [dispatch, fromBadge, tagifyRef])

  let allTags = {}
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      allTags[tag] = allTags[tag] !== undefined ? allTags[tag] + 1 : 1
    })
  })

  const sortedTags = Object.keys(allTags).sort()

  if (sortedTags.length === 0) {
    return null
  }

  return (
    <div className='tag-rename-wrapper'>
      <div className='tag-rename-wrapper-left'>
        <TagsList onBadgeClick={handleBadgeClick} />
      </div>
      <div className='tag-rename-wrapper-right'>
        <div className='from-badge badge badge-primary'>{fromBadge}</div>
        <ChevronsRight style={{ margin: 0, transform: 'rotateZ(90deg)' }} />
        <Tags
          tagifyRef={tagifyRef}
          name='tags'
          className='tagsInput'
          value={''}
          settings={{
            maxTags: 1,
            whitelist: sortedTags,
            placeholder: 'Type a tag',
            originalInputValueFormat: (valuesArr) =>
              valuesArr.map((item) => item.value).join(','),
            dropdown: {
              maxItems: 60,
              closeOnSelect: true,
              classname: 'tags-look',
              enabled: 0,
            },
          }}
        ></Tags>
        <div
          className='tag-rename-submit'
          onClick={submitClickable && handleSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  )
}

export default withRecipes(TagRename)
