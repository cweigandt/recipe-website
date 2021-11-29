import { useCallback, useRef, useState } from 'react'
import Tags from '@yaireo/tagify/dist/react.tagify'
import TagsList from './TagsList'
import { ReactComponent as ChevronsRight } from '../../svg/chevrons-right.svg'

import '../../styles/tags/TagRename.css'

const TagRename = () => {
  const tagifyRef = useRef(null)

  const [fromBadge, setFromBadge] = useState(' ')

  const handleBadgeClick = useCallback((tag) => {
    setFromBadge(tag)
  }, [])

  const handleSubmit = useCallback(() => {
    const toBadge = tagifyRef.current.value[0].value

    fetch('/rename-tag', {
      method: 'POST',
      redirect: 'manual',
      body: { fromTag: fromBadge, toTag: toBadge },
    }).then((response) => {
      response.json().then((data) => {
        let status = ALERT_TYPES.SUCCESS
        if (response.status !== 200) {
          status = ALERT_TYPES.ERROR
          console.log(data.stack)
        }

        dispatch(addAlert(data.response, status))
      })
    })
  }, [fromBadge, tagifyRef])

  let recipes = window.serverData.allRecipes
  let allTags = {}
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      allTags[tag] = allTags[tag] !== undefined ? allTags[tag] + 1 : 1
    })
  })

  const sortedTags = Object.keys(allTags).sort()

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
        <div className='tag-rename-submit' onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  )
}

export default TagRename
