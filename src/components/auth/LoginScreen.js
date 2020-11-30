import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startLogin, startRegister } from '../../actions/auth'
import moment from 'moment'
import Swal from 'sweetalert2'

import './login.css'
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker'
import { useState } from 'react'

export const LoginScreen = () => {
  const [dob, setDob] = useState(moment().toDate())
  const dispatch = useDispatch()

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  })

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: '',
    rLastName: '',
    rEmail: '',
    rDob: '',
    rCellphone: '',
    rPassword1: '',
    rPassword2: '',
  })

  const { lEmail, lPassword } = formLoginValues
  const {
    rName,
    rLastName,
    rEmail,
    rDob,
    rCellphone,
    rPassword1,
    rPassword2,
  } = formRegisterValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(lEmail, lPassword))
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (rPassword1 !== rPassword2) {
      return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error')
    }
    dispatch(
      startRegister(rEmail, rPassword1, rName, rLastName, rDob, rCellphone)
    )
  }

  const handleDob = (e) => {
    console.log(e)
    setDob(e)
    handleRegisterInputChange(e)
  }

  console.log(formRegisterValues)

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Correo'
                name='lEmail'
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='lPassword'
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className='form-group'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                name='rName'
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Apellido'
                name='rLastName'
                value={rLastName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Correo'
                name='rEmail'
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='tel'
                className='form-control'
                placeholder='Celular (sin 0 y sin 15)'
                name='rCellphone'
                value={rCellphone}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='form-group'>
              <label style={{ color: 'white' }}>Fecha de nacimiento</label>
              <DateTimePicker
                onChange={handleDob}
                value={dob}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='rPassword1'
                value={rPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
                name='rPassword2'
                value={rPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className='form-group'>
              <input type='submit' className='btnSubmit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
