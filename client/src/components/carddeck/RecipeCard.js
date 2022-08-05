import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
// import withCSSAnimation from '../hoc/withCSSAnimation'

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

const RecipeCard = ({
  name,
  section,
  tags,
  thumbnail,
  imageLocation,
  uploadTime,
}) => {
  const renderFavoritesTag = () => {
    let children = []
    if (tags.includes(`Brittany's Favorites`)) {
      children.push(<StarSVG key='star_1' />)
    }

    if (tags.includes(`Christian's Favorites`)) {
      children.push(<StarSVG key='star_2' />)
    }

    if (children.length > 0) {
      return <CardBookmark type={BOOKMARK_TYPES.STAR}>{children}</CardBookmark>
    }

    return null
  }

  const linkURL = '/recipe/' + name.replace(/ /g, '_')

  const imageSrc =
    thumbnail ||
    imageLocation ||
    'https://www.medicinalgenomics.com/wp-content/uploads/2019/01/image-coming-soon-ecc.png'

  const daysOld = getDaysOld(uploadTime)

  return (
    <Link
      to={linkURL}
      className='recipe-card'
      style={{ '--section-color': `var(--${section}-color)` }}
    >
      <LazyLoad
        height={160}
        once
        resize={true}
        offset={200}
        style={{ height: '160px', overflow: 'hidden' }}
      >
        <img
          src={imageSrc}
          className='recipe-image'
          alt={name}
          loading='lazy'
        />
      </LazyLoad>
      <div className='recipe-body'>
        <div className='recipe-section'>{section}</div>
        <div className='recipe-title'>{name}</div>
      </div>
      {daysOld <= 3 ? (
        <CardBookmark type={BOOKMARK_TYPES.NEW}>NEW</CardBookmark>
      ) : (
        renderFavoritesTag()
      )}
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

// export default withCSSAnimation(RecipeCard, { timeout: 200 })
export default RecipeCard
