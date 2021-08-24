import React from 'react'
import PropTypes from 'prop-types'

import FlipCard from '../widgets/FlipCard'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

import '../../styles/grid/GridCard.css'

function GridCard(props) {
  const linkURL = '/recipe/' + props.name.replace(/ /g, '_')

  return (
    <Link to={linkURL} class='grid-card'>
      <FlipCard
        front={
          <LazyLoad
            height={160}
            once
            resize={true}
            offset={200}
            style={{ height: '100%' }}
          >
            <img
              src={props.thumbnail}
              class='grid-card-image'
              alt={props.name}
              loading='lazy'
            />
          </LazyLoad>
        }
        back={
          <div
            class='grid-card-back'
            style={{
              'background-image': `url("${props.thumbnail}")`,
            }}
          >
            <div
              class='grid-card-back-color'
              style={{ '--section-color': `var(--${props.section}-color)` }}
            />
            <div class='grid-card-title'>{props.name}</div>
          </div>
        }
        classes='grid-flip-card'
      />
    </Link>
  )
}

GridCard.propTypes = {
  name: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
}

export default GridCard
