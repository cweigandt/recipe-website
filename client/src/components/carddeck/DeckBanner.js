import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../../styles/carddeck/DeckBanner.css'

function DeckBanner({ name, imageLocation, onSearchText }) {
  const [isSearching, setIsSearching] = useState(false)

  function handleSearchText(e) {
    let searchText = e.target.value
    window.scrollTo(0, 0)
    onSearchText(searchText)

    if (searchText) {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
  }

  const recipeName = name || ''
  const linkURL = '/recipe/' + recipeName.replace(/ /g, '_')

  return (
    <div id='bannerWrapper' class={isSearching ? 'searching' : ''}>
      {imageLocation && <img id='bannerImage' src={imageLocation} alt='' />}
      <form class='search-wrapper' onSubmit={() => false}>
        <div class='searchBar-wrapper'>
          <input
            id='searchBar'
            autocomplete='off'
            data-test-id='search-bar'
            class='form-control'
            type='text'
            placeholder='Search names or tags'
            aria-label='Search'
            onInput={handleSearchText}
          ></input>
        </div>
      </form>
      <div id='bannerTitle'>
        <Link to={linkURL}>{recipeName}</Link>
      </div>
    </div>
  )
}

DeckBanner.propTypes = {
  name: PropTypes.string.isRequired,
  imageLocation: PropTypes.string.isRequired,
  onSearchText: PropTypes.func.isRequired,
}

export default DeckBanner
