import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import Swal from 'sweetalert2'
import { appointmentLogout } from './appointment'

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST')
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      )
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startRegister = (
  email,
  password,
  name,
  lastname,
  dob,
  cellphone
) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        'client/',
        {
          email,
          password,
          name,
          lastname,
          dob,
          phones: [{ kind: 'Celular', number: cellphone }],
        },
        'POST'
      )
      const body = await resp.json()

      if (body.ok) {
        dispatch(login(body.addedClient))
      } else {
        Swal.fire('Error', 'Error al iniciar sesión', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', error.msg, 'error')
    }
  }
}

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth/renew')
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      )
    } else {
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({
  type: types.authLogin,
  payload: user,
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(appointmentLogout())
    dispatch(logout())
  }
}

const logout = () => ({ type: types.authLogout })
