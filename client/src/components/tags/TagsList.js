import React, { useState, useEffect } from 'react'

import '../../styles/widgets/Badge.css'

function TagsList({ onBadgeClick }) {
  const [tagCounts, setTagCounts] = useState({})

  useEffect(() => {
    let recipes = window.serverData.allRecipes
    let allTags = {}
    recipes.forEach((recipe) => {
      recipe.tags.forEach((tag) => {
        allTags[tag] = allTags[tag] !== undefined ? allTags[tag] + 1 : 1
      })
    })
    setTagCounts(allTags)
  }, [])

  const sortedTags = Object.keys(tagCounts).sort()

  return (
    <div className='badge-list'>
      {sortedTags.map((tag) => {
        return (
          <div
            className='badge badge-primary tags-list-badge'
            onClick={() => onBadgeClick(tag)}
            style={{ display: 'block', float: 'left', clear: 'left' }}
          >
            {`${tag} - ${tagCounts[tag]}`}
          </div>
        )
      })}
    </div>
  )
}

export default TagsList
