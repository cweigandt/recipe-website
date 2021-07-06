import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link } from 'react-router-dom'

import '../styles/NavBar.css'

function NavBar(props) {
  const [sections, setSections] = useState([])

  useEffect(() => {
    // query api
    fetch('/request/sections')
      .then((response) => response.json())
      .then((data) => {
        setSections(data)
      })
  }, [])

  function renderLink(link, text) {
    return (
      <li class='nav-item'>
        <NavLink to={link} class='nav-link'>
          {text}
        </NavLink>
      </li>
    )
  }

  return (
    <nav id='navbarParent' class='noprint custom-navbar fixed-top navbar-dark'>
      <button
        class='navbar-toggler collapsed'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
      >
        <span class='navbar-toggler-icon'></span>
      </button>

      <Link to='/' class='navbar-brand' id='navBarBrand'>
        {props.title}
      </Link>

      <div class='navbar-collapse collapse' id='navbarNav'>
        <ul class='nav navbar-nav' id='navbarListHolder'>
          {renderLink('/', 'Home')}
          {sections.map((section) => {
            return renderLink('/sections/' + section, section)
          })}
        </ul>
      </div>

      <div>
        <Link
          to='/grid'
          class='float-xs-right'
          style={{ color: 'gray', 'font-size': '24px' }}
        >
          <i
            class='fa fa-th-large'
            style={{ 'background-color': 'transparent' }}
          ></i>
        </Link>
      </div>
    </nav>
  )
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
}

export default NavBar
