import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { startLogoutClient } from '../../actions/auth'
import ArtistList from '../artists/ArtistList'
import ClientMenu from '../clients/ClientMenu'

import './navbar.css'

export const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const dispatch = useDispatch()
  const { loggedClient } = useSelector((state) => state.auth)
  const history = useHistory()

  window.onresize = () => setScreenWidth(window.innerWidth)

  const handleLogout = () => {
    dispatch(startLogoutClient())
  }

  const goToLogin = (userOrClient) => {
    history.push(`/${userOrClient}/login`)
  }

  const handleLogoClick = () => {
    history.push('/')
  }

  return (
    <div className='nav-container'>
      <div className='top-bar'>
        <h6 className='logo' onClick={handleLogoClick}>
          {screenWidth < 600 ? 'CMG' : 'CALL ME GRECIA'}
        </h6>
        {history.location.pathname === '/clients/calendar' && <ArtistList />}

        {!!loggedClient ? (
          <ClientMenu
            name={loggedClient.name}
            handleLogout={handleLogout}
            avatarName={loggedClient.avatarName}
          />
        ) : (
          <div className='d-flex flex-row'>
            {history.location.pathname !== '/clients/login' && (
              <button
                className='btn btn-primary mr-4 mt-2 mb-2'
                onClick={() => goToLogin('clients')}
              >
                <i className='fas fa-sign-in-alt'></i>
                <span> Ingreso clientes </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
