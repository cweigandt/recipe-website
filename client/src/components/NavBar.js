import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { showModal } from '../actions/modalActions'
import * as ModalTypes from './modals/ModalTypes'

import '../styles/NavBar.css'
import { logIn, logOut } from '../actions/loginActions'

let modalId = -1

function NavBar({ confirmedAreYouSureIds, dispatch, title, isLoggedIn }) {
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

  useEffect(() => {
    // Navbar is responsible for setting initial logged in state
    if (cookies['token']) {
      dispatch(logIn())
    }
  }, [dispatch, cookies])

  useEffect(() => {
    if (!confirmedAreYouSureIds.includes(modalId)) {
      return
    }

    fetch('/signout', {
      method: 'POST',
      redirect: 'manual',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      modalId = -1
      dispatch(logOut())
    })
  }, [confirmedAreYouSureIds, dispatch])

  const handleLoginClick = () => {
    dispatch(showModal(ModalTypes.LOGIN))
  }

  const handleLogoutClick = () => {
    const action = showModal(
      ModalTypes.ARE_YOU_SURE,
      'Would you like to log out?'
    )
    modalId = action.id
    dispatch(action)
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

  const renderSeparator = () => {
    return <li class='nav-item separator' />
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const renderMenu = () => {
    return (
      <div class={'navbar-menu ' + (showMenu ? 'navbar-menu-visible' : '')}>
        <ul class='navbar-menu-list' id='navbarListHolder'>
          {renderLink('/', 'Home')}
          {renderLink('/grid', 'Grid')}
          {isLoggedIn && renderLink('/edit', 'Edit')}
          {isLoggedIn && renderLink('/upload', 'Upload')}
          {renderSeparator()}
          {sections.map((section) => {
            return renderLink('/sections/' + section, section)
          })}
        </ul>
      </div>
    )
  }

  const renderLoginButton = () => {
    if (isLoggedIn) {
      return (
        <div
          class='navbar-logged-in'
          data-test-id='logout-button'
          onClick={handleLogoutClick}
        ></div>
      )
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
        <div
          onClick={toggleMenu}
          class={'menu-toggler ' + (showMenu ? 'open' : 'closed')}
        >
          <i class='fa fa-angle-double-right'></i>
        </div>

        <Link to='/' class='navbar-brand' id='navBarBrand'>
          {title}
        </Link>

        <div class='navbar-right'>{renderLoginButton()}</div>
      </nav>
      {renderMenu()}
    </Fragment>
  )
}

NavBar.propTypes = {
  confirmedAreYouSureIds: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default connect((state) => ({
  confirmedAreYouSureIds: state.modal.confirmedAreYouSureIds,
  isLoggedIn: state.login.isLoggedIn,
}))(NavBar)
