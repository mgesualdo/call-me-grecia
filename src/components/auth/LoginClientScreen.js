import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startLoginClient } from '../../actions/auth'
import Input from '../ui/Input'

import './login.css'

import { Navbar } from '../ui/Navbar'
import LoginSVG from '../ui/LoginSVG'
import { useHistory } from 'react-router'
import Spinner from '../ui/Spinner'

export const LoginClientScreen = () => {
  const { loadingLogin } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const history = useHistory()

  const [formLoginValues, handleChange] = useForm({
    email: '',
    password: '',
  })

  const { email, password } = formLoginValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLoginClient(email, password))
  }

  const handleClick = () => history.push(`/clients/register`)

  return (
    <>
      <Navbar />
      <div className='login-screen-container'>
        <div className='login-form-container'>
          <div className='login-header'>
            <h3>Ingreso CLIENTES</h3>
            <LoginSVG width={'20%'} heigth={'20%'} />
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

            <button type='submit' className='btn-submit'>
              {loadingLogin ? <Spinner /> : 'Iniciar sesión'}
            </button>
          </form>
        </div>
        <div className='go-to-register-section'>
          <h4>¿Todavía no estás registrad@?</h4>
          <button
            onClick={handleClick}
            className='btn-go-to-register'
            style={{
              fontSize: '1.3rem',
              borderRadius: '0.5rem',
              backgroundColor: '#dabcb2',
              color: '#333',
              padding: '1rem 1.5rem',
              boxShadow: '0 2px 8px #555',
            }}
          >
            Registrarme
          </button>
        </div>
      </div>
    </>
  )
}
