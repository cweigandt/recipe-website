import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Badge.css'

function TagsList(props) {
  const [tagCounts, setTagCounts] = useState({})

  useEffect(() => {
    fetch('/request/all-recipes')
      .then((response) => response.json())
      .then((data) => {
        let recipes = data
        let allTags = {}
        recipes.forEach((recipe) => {
          recipe.tags.forEach((tag) => {
            allTags[tag] = allTags[tag] !== undefined ? allTags[tag] + 1 : 1
          })
        })
        setTagCounts(allTags)
      })
  }, [])

  const sortedTags = Object.keys(tagCounts).sort()

  return (
    <div class='badge-list'>
      {sortedTags.map((tag) => {
        return (
          <Link
            to={'/tag/' + tag.replace(/ /g, '_')}
            style={{ 'text-decoration': 'none' }}
          >
            <div
              class='badge badge-primary'
              style={{ display: 'block', float: 'left', clear: 'left' }}
            >
              {`${tag} - ${tagCounts[tag]}`}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default TagsList
