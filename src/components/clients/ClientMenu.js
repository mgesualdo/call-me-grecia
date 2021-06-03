import React, { useEffect, useState } from 'react'
import './clientMenu.css'
import { clientMenuOptions } from '../../utils/constants'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ClientMenu = ({ name, handleLogout, avatarName }) => {
  const [optionsVisible, setOptionsVisible] = useState(false)
  const { refreshImage } = useSelector((state) => state.ui)

  const history = useHistory()

  const handleHeaderClick = (e) => {
    console.log(e)
    setOptionsVisible(!optionsVisible)
  }

  const userImageUrl = `https://appturnos.blob.core.windows.net/clientes/${
    avatarName ? avatarName : 'no-user.png'
  }?${refreshImage}`

  return (
    <>
      <div
        onClick={() => setOptionsVisible(false)}
        className={`background-overlay ${optionsVisible && 'show-overlay'}`}
      ></div>
      <div className={`menu-box ${optionsVisible ? 'active' : ''}`}>
        <div
          className={`menu-header ${optionsVisible ? 'active' : ''}`}
          onClick={handleHeaderClick}
          id='menu-cliente-header'
        >
          <div className='menu-user-info'>
            <img src={userImageUrl} alt='Imagen del usuario' />
            <h6>{name}</h6>
          </div>
          <i className='fas fa-angle-down'></i>
        </div>

        <div
          className={`options ${optionsVisible ? 'active' : ''}`}
          id='opciones-menu-cliente'
        >
          {clientMenuOptions.map((option) => (
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

export default ClientMenu
