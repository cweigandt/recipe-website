import { useCallback, useEffect, useState } from 'react'
import Tags from '@yaireo/tagify/dist/react.tagify'
import TagsList from '../TagsList'

const TagRename = () => {
  const [fromBadge, setFromBadge] = useState('')

  const handleBadgeClick = useCallback((tag) => {
    setFromBadge(tag)
  }, [])

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
      <TagsList onBadgeClick={handleBadgeClick} />
      <div className='from-badge badge badge-primary'>{fromBadge}</div>
      <br />
      <Tags
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
            classname: 'tags-look',
            enabled: 1,
            closeOnSelect: false,
          },
        }}
      ></Tags>
    </div>
  )
}

export default TagRename
