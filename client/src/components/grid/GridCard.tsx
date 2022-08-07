import FlipCard from '../widgets/FlipCard'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

import '../../styles/grid/GridCard.css'
import { PartialRecipe } from '../../types/RecipeTypes'

function GridCard(props: PartialRecipe) {
  const linkURL = '/recipe/' + props.name.replace(/ /g, '_')

  return (
    <Link to={linkURL} className='grid-card'>
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
              className='grid-card-image'
              alt={props.name}
              loading='lazy'
            />
          </LazyLoad>
        }
        back={
          <div
            className='grid-card-back'
            style={{
              backgroundImage: `url("${props.thumbnail}")`,
            }}
          >
            <div
              className='grid-card-back-color'
              style={
                {
                  '--section-color': `var(--${props.section}-color)`,
                } as React.CSSProperties
              }
            />
            <div className='grid-card-title'>{props.name}</div>
          </div>
        }
        classes='grid-flip-card'
      />
    </Link>
  )
}

export default GridCard
