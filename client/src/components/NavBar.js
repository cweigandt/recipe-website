import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../styles/NavBar.css'

function NavBar(props) {
  const [sections, setSections] = useState([])
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    // query api
    fetch('/request/sections')
      .then((response) => response.json())
      .then((data) => {
        setSections(data)
      })
  }, [])

  const renderLink = (link, text) => {
    return (
      <li class='nav-item'>
        <Link to={link} onClick={toggleMenu} class='navbar-menu-link'>
          {text}
        </Link>
      </li>
    )
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const renderMenu = () => {
    return (
      <div class={'navbar-menu ' + (showMenu ? 'navbar-menu-visible' : '')}>
        <ul class='navbar-menu-list' id='navbarListHolder'>
          {renderLink('/', 'Home')}
          {sections.map((section) => {
            return renderLink('/sections/' + section, section)
          })}
        </ul>
      </div>
    )
  }

  return (
    <Fragment>
      <nav id='navbarParent' class='noprint navbar'>
        <div onClick={toggleMenu} class='menu-toggler'>
          <i class={'fa fa-angle-double-' + (showMenu ? 'left' : 'right')}></i>
        </div>

        <Link to='/' class='navbar-brand' id='navBarBrand'>
          {props.title}
        </Link>

        <div>
          <Link to='/grid' style={{ color: 'gray', 'font-size': '24px' }}>
            <i
              class='fa fa-th-large'
              style={{ 'background-color': 'transparent' }}
            ></i>
          </Link>
        </div>
      </nav>
      {renderMenu()}
    </Fragment>
  )
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
}

export default NavBar
