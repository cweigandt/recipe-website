import React, { useEffect, useState, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import * as ModalTypes from '../../constants/ModalTypes'

import '../../styles/navbar/NavBar.css'
import { ReactComponent as GridSVG } from '../../svg/grid-alt.svg'
import { ReactComponent as HomeSVG } from '../../svg/home.svg'
import { ReactComponent as EditSVG } from '../../svg/edit.svg'
import { ReactComponent as UploadSVG } from '../../svg/upload.svg'
import { ReactComponent as ChevronsRight } from '../../svg/chevrons-right.svg'
import { ReactComponent as RenameSVG } from '../../svg/rename.svg'
// import { ReactComponent as ReportSVG } from '../../svg/report.svg'
import { ReactComponent as CartSVG } from '../../svg/cart.svg'

import { ReactComponent as LoginSVG } from '../../svg/login.svg'
import DarkThemeToggle from './DarkThemeToggle'
import { Dispatch } from 'redux'
import { RootState } from '../../reducers'
import groceriesSlice from '../../reducers/groceries'
import modalSlice, { generateUniqueId } from '../../reducers/modal'
import loginSlice from '../../reducers/login'

let modalId = -1

type Props = {
  confirmedAreYouSureIds: number[]
  dispatch: Dispatch
  title: string
  isLoggedIn: boolean
  isShopping: boolean
  cartSize: number
}

function NavBar({
  confirmedAreYouSureIds,
  dispatch,
  title,
  isLoggedIn,
  isShopping,
  cartSize,
}: Props) {
  const [sections, setSections] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [cookies] = useCookies<any>(['user'])
  const history = useHistory()

  useEffect(() => {
    // query api
    fetch('/request/sections')
      .then((response) => response.json())
      .then((data) => {
        const sorted = data.sort()
        setSections(sorted)
      })
  }, [])

  useEffect(() => {
    // Navbar is responsible for setting initial logged in state
    if (cookies['token']) {
      dispatch(loginSlice.actions.logIn({}))
    }
    dispatch(loginSlice.actions.loginSynced({}))
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
      dispatch(loginSlice.actions.logOut({}))
    })
  }, [confirmedAreYouSureIds, dispatch])

  const handleLoginClick = () => {
    dispatch(
      modalSlice.actions.showModal({
        modal: ModalTypes.LOGIN,
        id: generateUniqueId(),
      })
    )
  }

  const handleLogoutClick = () => {
    modalId = generateUniqueId()
    const action = modalSlice.actions.showModal({
      modal: ModalTypes.ARE_YOU_SURE,
      id: modalId,
      additionalText: 'Would you like to log out?',
    })
    dispatch(action)
  }

  const handleGroceriesClick = useCallback(() => {
    if (!isShopping) {
      dispatch(groceriesSlice.actions.startShopping({}))
    } else {
      history.push('/groceries')
    }
  }, [dispatch, history, isShopping])

  const renderLink = (link: string, text: string, icon?: React.ReactNode) => {
    return (
      <li className='nav-item'>
        <Link to={link} onClick={toggleMenu} className='navbar-menu-link'>
          {icon}
          {text}
        </Link>
      </li>
    )
  }

  const renderDarkModeToggle = () => {
    return (
      <div className='settings-holder'>
        <DarkThemeToggle />
      </div>
    )
  }

  const renderSeparator = () => {
    return <li className='nav-item separator' />
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const renderMenu = () => {
    return (
      <div
        className={'navbar-menu ' + (showMenu ? 'navbar-menu-visible' : '')}
        data-test-id='navbar-menu'
      >
        <ul className='navbar-menu-list' id='navbarListHolder'>
          {renderLink('/', 'Home', <HomeSVG />)}
          {renderLink('/grid', 'Grid', <GridSVG />)}
          {/* {renderLink('/reports', 'Reports', <ReportSVG />)} */}
          {isLoggedIn && renderLink('/edit', 'Edit', <EditSVG />)}
          {isLoggedIn && renderLink('/upload', 'Upload', <UploadSVG />)}
          {isLoggedIn && renderLink('/tags', 'Tag Rename', <RenameSVG />)}
          {renderSeparator()}
          {sections.map((section) => {
            return renderLink('/sections/' + section, section)
          })}
        </ul>
        {renderDarkModeToggle()}
      </div>
    )
  }

  const renderLoginButton = () => {
    if (isLoggedIn) {
      return (
        <>
          <>
            <CartSVG className='cart' onClick={handleGroceriesClick} />
            {cartSize > 0 && <div className='cart-count'>{cartSize}</div>}
          </>
          <div
            className='navbar-logged-in'
            data-test-id='logout-button'
            onClick={handleLogoutClick}
          ></div>
        </>
      )
    }

    return (
      <div
        className='navbar-button'
        data-test-id='login-button'
        onClick={handleLoginClick}
      >
        <LoginSVG className='login-svg' />
      </div>
    )
  }

  return (
    <Fragment>
      <nav
        id='navbarParent'
        className={`noprint navbar ${isShopping ? 'shopping' : ''}`}
      >
        <div
          onClick={toggleMenu}
          className={'menu-toggler ' + (showMenu ? 'open' : 'closed')}
          data-test-id='navbar-menu-toggle'
        >
          <ChevronsRight />
        </div>

        <Link to='/' className='navbar-brand' id='navBarBrand'>
          {title}
        </Link>

        <div className='navbar-right'>{renderLoginButton()}</div>
      </nav>
      {renderMenu()}
    </Fragment>
  )
}

export default connect((state: RootState) => ({
  confirmedAreYouSureIds: state.modal.confirmedAreYouSureIds,
  isLoggedIn: state.login.isLoggedIn,
  isShopping: state.groceries.isShopping,
  cartSize: Object.keys(state.groceries.cart).length,
}))(NavBar)
