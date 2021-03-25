import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startLoginUser } from '../../actions/auth'
import Input from '../ui/Input'

import './login.css'

import { Navbar } from '../ui/Navbar'
import LoginUserSVG from '../ui/LoginUserSVG'
import Spinner from '../ui/Spinner'

export const LoginUserScreen = () => {
  const { loadingLogin } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  const [formLoginValues, handleChange] = useForm({
    email: '',
    password: '',
  })

  const { email, password } = formLoginValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLoginUser(email, password))
  }

  return (
    <>
      <Navbar />
      <div className='login-screen-container'>
        <div className='login-form-container'>
          <div className='login-header'>
            <h3>Ingreso USUARIOS</h3>
            <LoginUserSVG width={'20%'} heigth={'20%'} />
          </div>
          <form onSubmit={handleLogin}>
            <Input
              type='email'
              placeholder='Correo'
              name='email'
              value={email}
              handleChange={handleChange}
            />

            <Input
              type='password'
              placeholder='Contraseña'
              name='password'
              value={password}
              handleChange={handleChange}
            />

            <button type='submit' className='btn-submit no-border-or-outline'>
              {loadingLogin ? <Spinner /> : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
