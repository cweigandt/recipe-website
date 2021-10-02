import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

import '../../styles/carddeck/RecipeCard.css'
import CardBookmark, { BOOKMARK_TYPES } from '../widgets/CardBookmark'
import { ReactComponent as StarSVG } from '../../svg/star.svg'

const getDaysOld = (uploadTime) => {
  let ms = Date.now() - uploadTime
  let seconds = ms / 1000
  let minutes = seconds / 60
  let hours = minutes / 60
  let days = hours / 24
  return Math.floor(days)
}

const RecipeCard = (props) => {
  const renderFavoritesTag = () => {
    let children = []
    if (props.tags.includes(`Brittany's Favorites`)) {
      children.push(<StarSVG />)
    }

    if (props.tags.includes(`Christian's Favorites`)) {
      children.push(<StarSVG />)
    }

    if (children.length > 0) {
      return <CardBookmark type={BOOKMARK_TYPES.STAR}>{children}</CardBookmark>
    }

    return null
  }

  const linkURL = '/recipe/' + props.name.replace(/ /g, '_')

  const imageLocation =
    props.thumbnail ||
    props.imageLocation ||
    'https://www.medicinalgenomics.com/wp-content/uploads/2019/01/image-coming-soon-ecc.png'

  const daysOld = getDaysOld(props.uploadTime)

  return (
    <Link
      to={linkURL}
      className='recipe-card'
      style={{ '--section-color': `var(--${props.section}-color)` }}
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
          className='recipe-image'
          alt={props.name}
          loading='lazy'
        />
      </LazyLoad>
      <div className='recipe-body'>
        <div className='recipe-section'>{props.section}</div>
        <div className='recipe-title'>{props.name}</div>
      </div>
      {daysOld <= 3 && (
        <CardBookmark type={BOOKMARK_TYPES.NEW}>NEW</CardBookmark>
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
