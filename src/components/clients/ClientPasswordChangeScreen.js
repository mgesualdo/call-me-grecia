import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { uiLoadingChangingPassword } from '../../actions/ui'
import { fetchSinToken } from '../../helpers/fetch'
import { useForm } from '../../hooks/useForm'
import Input from '../ui/Input'
import { Navbar } from '../ui/Navbar'
import Spinner from '../ui/Spinner'

const ClientPasswordChangeScreen = () => {
  const { loadingChangingPassword } = useSelector((state) => state.ui)
  const { loggedClient } = useSelector((state) => state.auth)
  const [formRegisterValues, handleChange, resetForm] = useForm({
    password: '',
    newPassword1: '',
    newPassword2: '',
  })

  const dispatch = useDispatch()

  const { password, newPassword1, newPassword2 } = formRegisterValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword1 !== newPassword2) {
      return Swal.fire(
        'Error',
        'Las nuevas contraseñas que ingresaste no coinciden entre sí',
        'error'
      )
    } else if (newPassword1 === password) {
      return Swal.fire(
        'Error',
        'Tienes que ingresar una contraseña distinta de tu contraseña actual',
        'error'
      )
    } else {
      dispatch(uiLoadingChangingPassword(true))
      const res = await fetchSinToken(
        `client/change-password/${loggedClient._id}`,
        { password, newPassword: newPassword1 },
        'PUT'
      )
      const resJson = await res.json()
      Swal.fire(
        resJson.title,
        resJson.message,
        resJson.ok ? 'success' : 'error'
      )
      dispatch(uiLoadingChangingPassword(false))
      resetForm()
    }
  }

  return (
    <>
      <Navbar />
      <div className='login-screen-container'>
        <div className='login-form-container'>
          <h3>Cambiar contraseña</h3>
          <form onSubmit={handleSubmit}>
            <Input
              type='password'
              placeholder='Contraseña actual'
              name='password'
              // minLength={4}
              value={password}
              handleChange={handleChange}
              required
            />
            <Input
              type='password'
              placeholder='Nueva contraseña'
              name='newPassword1'
              minLength={4}
              value={newPassword1}
              handleChange={handleChange}
              required
            />
            <Input
              type='password'
              placeholder='Repita la nueva contraseña'
              name='newPassword2'
              minLength={4}
              value={newPassword2}
              handleChange={handleChange}
              required
            />
            <button type='submit' className='btn-submit'>
              {loadingChangingPassword ? (
                <Spinner width='0.1rem' height='0.1rem' />
              ) : (
                'Cambiar contraseña'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ClientPasswordChangeScreen
