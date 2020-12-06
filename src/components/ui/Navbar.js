import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth'

export const Navbar = () => {
  const dispatch = useDispatch()
  const { loggedClient } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4 '>
      <span className='navbar-brand ml-2'>Hola, {loggedClient.name}</span>

      <button className='btn btn-danger mr-2' onClick={handleLogout}>
        <i className='fas fa-sign-out-alt'></i>
        <span> Salir</span>
      </button>
    </div>
  )
}
