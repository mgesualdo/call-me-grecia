import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { startLogoutUser } from '../../actions/auth'
import UserMenu from '../users/UserMenu'

import './userNavbar.css'

export const UserNavbar = () => {
  const dispatch = useDispatch()
  const { loggedUser } = useSelector((state) => state.auth)
  const history = useHistory()

  const handleLogout = () => {
    dispatch(startLogoutUser())
  }

  const goToLogin = () => {
    history.push('/users/login')
  }

  const handleLogoClick = () => {
    history.push('/users/calendario')
  }

  return (
    <div className='top-bar'>
      <h6 className='logo' onClick={handleLogoClick}>
        CALL ME GRECIA
      </h6>

      {!!loggedUser ? (
        <UserMenu handleLogout={handleLogout} />
      ) : (
        <div className='d-flex flex-row'>
          <button className='btn btn-primary mr-2' onClick={goToLogin}>
            <i className='fas fa-sign-in-alt'></i>
            <span> Ingresar </span>
          </button>
        </div>
      )}
    </div>
  )
}
