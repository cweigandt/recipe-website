import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import withCSSAnimation from '../hoc/withCSSAnimation'

import '../../styles/carddeck/DeckBanner.css'

type Props = {
  name: string
  imageLocation: string
  initialSearchText?: string
  onSearchText: (text: string) => void
}

const DeckBanner = ({
  name,
  imageLocation,
  initialSearchText,
  onSearchText,
}: Props) => {
  const [isSearching, setIsSearching] = useState(
    initialSearchText && initialSearchText !== ''
  )

  const handleSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let searchText = e.target.value
      window.scrollTo(0, 0)
      onSearchText(searchText)

      if (searchText) {
        setIsSearching(true)
      } else {
        setIsSearching(false)
      }
    },
    [onSearchText]
  )

  const renderImage = () => {
    if (!imageLocation) {
      return null
    }
    const AnimatedImg = withCSSAnimation('img', { timeout: 400 })
    return <AnimatedImg id='bannerImage' src={imageLocation} alt='' />
  }

  const recipeName = name || ''
  const linkURL = '/recipe/' + recipeName.replace(/ /g, '_')

  return (
    <div id='bannerWrapper' className={isSearching ? 'searching' : ''}>
      {renderImage()}
      <form className='search-wrapper' onSubmit={() => false}>
        <div className='searchBar-wrapper'>
          <input
            id='searchBar'
            autoComplete='off'
            data-test-id='search-bar'
            defaultValue={initialSearchText || ''}
            className='form-control'
            type='text'
            placeholder='Search names or tags'
            aria-label='Search'
            onInput={handleSearchText}
            onKeyDown={(e) => {
              if (e.keyCode === 13 || e.key === 'Enter') {
                e.preventDefault()
                return false
              }
            }}
          ></input>
        </div>
      </form>
      <div id='bannerTitle'>
        <Link to={linkURL}>{recipeName}</Link>
      </div>
    </div>
  )
}

export default DeckBanner
