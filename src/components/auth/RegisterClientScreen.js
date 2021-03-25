import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { startRegister } from '../../actions/auth'
import Input from '../ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { Navbar } from '../ui/Navbar'
import 'react-datepicker/dist/react-datepicker.css'
import Spinner from '../ui/Spinner'
import BirthayPicker from '../ui/DropDowns/BirthayPicker'

const RegisterClientScreen = () => {
  const { loadingRegister } = useSelector((state) => state.ui)
  const [selectedDay, setSelectedDay] = useState()
  const [selectedMonth, setSelectedMonth] = useState()
  const [selectedYear, setSelectedYear] = useState()
  const [formRegisterValues, handleChange, resetForm] = useForm({
    name: '',
    lastname: '',
    email: '',
    dob: '',
    cellphone: '',
    password1: '',
    password2: '',
  })
  const {
    name,
    lastname,
    email,
    cellphone,
    password1,
    password2,
  } = formRegisterValues

  const dispatch = useDispatch()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password1 !== password2) {
      return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error')
    }
    dispatch(
      startRegister(
        email,
        password1,
        name,
        lastname,
        `${selectedDay}/${selectedMonth}/${selectedYear}`,
        cellphone,
        resetForm
      )
    )
  }

  return (
    <>
      <Navbar />
      <div className='login-screen-container'>
        <div className='login-form-container'>
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <Input
              type='text'
              placeholder='Nombre'
              name='name'
              minLength={2}
              value={name}
              handleChange={handleChange}
              required
            />

            <Input
              type='text'
              placeholder='Apellido'
              name='lastname'
              minLength={2}
              value={lastname}
              handleChange={handleChange}
              required
            />

            <Input
              type='email'
              placeholder='Correo'
              name='email'
              value={email}
              // regexp={}
              minLength={7}
              handleChange={handleChange}
              required
            />

            <Input
              type='tel'
              placeholder='Celular (sin 0 y sin 15)'
              name='cellphone'
              minLength={8}
              value={cellphone}
              handleChange={handleChange}
              required
            />

            <BirthayPicker
              selectedDay={selectedDay}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedDay={setSelectedDay}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
            />
            <Input
              type='password'
              placeholder='Contraseña'
              name='password1'
              minLength={4}
              value={password1}
              handleChange={handleChange}
              required
            />
            <Input
              type='password'
              placeholder='Repita la contraseña'
              name='password2'
              minLength={4}
              value={password2}
              handleChange={handleChange}
              required
            />
            <button type='submit' className='btn-submit'>
              {loadingRegister ? (
                <Spinner width='0.1rem' height='0.1rem' />
              ) : (
                'Registrarme'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterClientScreen
