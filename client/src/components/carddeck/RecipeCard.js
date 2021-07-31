import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

import '../../styles/RecipeCard.css'
import SectionColors from '../../enums/SectionColors'
import CardBookmark, { BOOKMARK_TYPES } from '../widgets/CardBookmark'

function RecipeCard(props) {
  function getDaysOld(uploadTime) {
    let ms = Date.now() - uploadTime
    let seconds = ms / 1000
    let minutes = seconds / 60
    let hours = minutes / 60
    let days = hours / 24
    return Math.floor(days)
  }

  const renderFavoritesTag = () => {
    let text = ''
    if (props.tags.includes(`Brittany's Favorites`)) {
      text += ' ⭐ '
    }

    if (props.tags.includes(`Christian's Favorites`)) {
      text += ' ⭐ '
    }

    if (text) {
      return (
        <CardBookmark text={text} type={BOOKMARK_TYPES.INFO}></CardBookmark>
      )
    }

    return null
  }

  const linkURL = '/recipe/' + props.name.replace(/ /g, '_')

  const imageLocation =
    props.thumbnail ||
    'https://www.medicinalgenomics.com/wp-content/uploads/2019/01/image-coming-soon-ecc.png'

  const daysOld = getDaysOld(props.uploadTime)

  return (
    <Link
      to={linkURL}
      class='recipe-card'
      style={{ '--section-color': SectionColors[props.section] }}
    >
      <LazyLoad
        height={160}
        once
        resize={true}
        offset={200}
        style={{ height: '160px', overflow: 'hidden' }}
      >
        <img
          src={imageLocation}
          class='recipe-image'
          alt={props.name}
          loading='lazy'
        />
      </LazyLoad>
      <div class='recipe-body'>
        <div class='recipe-section'>{props.section}</div>
        <div class='recipe-title'>{props.name}</div>
      </div>
      {daysOld <= 3 ? (
        <CardBookmark text='New' type={BOOKMARK_TYPES.NEW}></CardBookmark>
      ) : (
        ''
      )}
      {daysOld > 3 && renderFavoritesTag()}
    </Link>
  )
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  uploadTime: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
}

export default RecipeCard
