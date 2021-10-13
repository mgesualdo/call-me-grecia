import React, { useState } from 'react'
import './userMenu.css'
import { userMenuOptions } from '../../utils/constants'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserMenu = ({ handleLogout }) => {
  const { loggedUser } = useSelector((state) => state.auth)
  const { refreshImage } = useSelector((state) => state.ui)
  const [optionsVisible, setOptionsVisible] = useState(false)

  const history = useHistory()

  const handleHeaderClick = (e) => {
    setOptionsVisible(!optionsVisible)
  }

  const userImageUrl = `https://appturnos.blob.core.windows.net/usuarios/${
    loggedUser?.avatarName ? loggedUser?.avatarName : 'no-user.png'
  }?${refreshImage}`

  const filteredMenuOptions = userMenuOptions.filter((option) => {
    if (loggedUser?.roles.length === 2 || !loggedUser) {
      return option
    } else if (
      loggedUser?.roles.includes('USER') &&
      !loggedUser?.roles.includes('ADMIN')
    ) {
      return option.allowedRoles.includes('USER') && option
    } else if (
      loggedUser?.roles.includes('ADMIN') &&
      !loggedUser?.roles.includes('USER')
    ) {
      return option.allowedRoles.includes('ADMIN') && option
    } else {
      return option
    }
  })

  return (
    <>
      <div
        onClick={() => setOptionsVisible(false)}
        className={`background-overlay ${optionsVisible && 'show-overlay'}`}
      ></div>
      <div className='menu-box'>
        <div
          className={`menu-header ${optionsVisible ? 'active' : ''}`}
          onClick={handleHeaderClick}
        >
          <div className='menu-user-info'>
            <img src={userImageUrl} alt='Imagen del usuario' />
            <h6>{loggedUser?.name}</h6>
          </div>
          <i className='fas fa-angle-down'></i>
        </div>

        <div className={`options ${optionsVisible ? 'active' : ''}`}>
          {filteredMenuOptions.map((option) => (
            <div
              className='option'
              key={option.path}
              onClick={() => history.push(option.path)}
            >
              <i className={option.icon}></i>
              <span> {option.text}</span>
            </div>
          ))}

          <div className='option logout' onClick={handleLogout}>
            <i className='fas fa-sign-out-alt'></i>
            <span> Salir</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserMenu
