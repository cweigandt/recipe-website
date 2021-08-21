import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { showModal } from '../actions/modalActions'
import * as ModalTypes from './modals/ModalTypes'

import '../styles/NavBar.css'

function NavBar(props) {
  const [sections, setSections] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [cookies] = useCookies(['user'])

  useEffect(() => {
    // query api
    fetch('/request/sections')
      .then((response) => response.json())
      .then((data) => {
        setSections(data)
      })
  }, [])

  const handleLoginClick = () => {
    props.dispatch(showModal(ModalTypes.LOGIN))
  }

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

  const renderLoginButton = () => {
    if (cookies['token']) {
      return <div class='navbar-logged-in'></div>
    }

    return (
      <div
        class='navbar-button'
        data-test-id='login-button'
        onClick={handleLoginClick}
      >
        <img
          src='/icons/login.svg'
          style={{ transform: 'scale(1.5)' }}
          alt='Login'
        ></img>
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

        <div class='navbar-right'>
          <Link
            to='/grid'
            style={{ display: 'flex', color: 'gray', 'font-size': '24px' }}
          >
            <i
              class='fa fa-th-large'
              style={{ 'background-color': 'transparent' }}
            ></i>
          </Link>
          {renderLoginButton()}
        </div>
      </nav>
      {renderMenu()}
    </Fragment>
  )
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
}

export default connect()(NavBar)
