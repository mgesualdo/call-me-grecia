import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import { appointmentLogout } from './appointment'
import Swal from 'sweetalert2'
import { uiLoadingLogin, uiLoadingRegister } from './ui'
import { toPropperCaseAndTrim } from '../helpers/toPropperCase'

export const startLoginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(uiLoadingLogin(true))
    const resp = await fetchSinToken('user/login', { email, password }, 'POST')
    const body = await resp.json()

    console.log(body.msg)

    if (body.ok) {
      dispatch(loginUser(body.user))
    } else {
      Swal.fire('Error', 'No se pudo iniciar sesión!', 'error')
    }
    dispatch(uiLoadingLogin(false))
  }
}
export const startRefreshLoggedUser = (id) => {
  return async (dispatch) => {
    dispatch(uiLoadingLogin(true))
    const resp = await fetchSinToken(`user/refresh/${id}`, {}, 'GET')
    const body = await resp.json()

    if (body.ok) {
      dispatch(loginUser(body.refreshedUser))
    } else {
      Swal.fire('Error', 'No se pudo actualizar el usuario logueado!', 'error')
    }
    dispatch(uiLoadingLogin(false))
  }
}

const loginUser = (user) => {
  localStorage.clear()
  localStorage.setItem('loggedUser', JSON.stringify(user))

  return { type: types.userLogin, payload: user }
}

export const startLogoutUser = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(logoutUser())
  }
}

const logoutUser = () => ({ type: types.userLogout })

export const startRegister = (
  email,
  password,
  name,
  lastname,
  dob,
  cellphone,
  reset
) => {
  return async (dispatch) => {
    try {
      dispatch(uiLoadingRegister(true))
      const resp = await fetchSinToken(
        'client/',
        {
          email,
          password,
          name: toPropperCaseAndTrim(name),
          lastname: toPropperCaseAndTrim(lastname),
          dob,
          phones: [{ kind: 'Celular', number: cellphone }],
        },
        'POST'
      )
      const body = await resp.json()

      if (body.ok) {
        Swal.fire(
          'Felitaciones, solo falta que </br> valides tu email!',
          `</br>
          Te enviamos un correo a <span style="color:#18f;">${email}</span> para que puedas validarlo, luego podrás iniciar sesión!
          </br>
          </br>
          No olvides revisar tu bandeja de <span style="color:#f02e2e">correo no deseado</span>
          </br>
          `,
          'success'
        )
        reset()
      } else {
        if (body.message.code === 11000) {
          Swal.fire(
            'Error',
            'Ya existe un usuario con ese correo electrónico',
            'error'
          )
        } else {
          Swal.fire('Error al registrarse', 'Intente más tarde', 'error')
        }
      }
      dispatch(uiLoadingRegister(false))
      const contenidoSelectDay = document.getElementById('contenido-select-day')
      const contenidoSelectMonth = document.getElementById(
        'contenido-select-month'
      )
      const contenidoSelectYear = document.getElementById(
        'contenido-select-year'
      )

      contenidoSelectDay.firstChild.innerHTML = `<h4 id='titulo-day'> Día </h4>`
      contenidoSelectMonth.firstChild.innerHTML = `<h4 id='titulo-day'> Mes </h4>`
      contenidoSelectYear.firstChild.innerHTML = `<h4 id='titulo-day'> Año </h4>`
    } catch (error) {
      console.log(error)
      Swal.fire('Error', error.msg, 'error')
    }
  }
}

export const startLoginClient = (email, password) => {
  return async (dispatch) => {
    dispatch(uiLoadingLogin(true))
    const resp = await fetchSinToken(
      'client/login',
      { email, password },
      'POST'
    )
    const body = await resp.json()
    dispatch(uiLoadingLogin(false))
    if (body.ok) {
      dispatch(loginClient(body.client))
    } else {
      if (
        body.msgTitle === 'Usuario inactivo' ||
        body.msgTitle === 'Contraseña incorrecta'
      ) {
        Swal.fire({
          title: body.msgTitle,
          html: body.msgBody,
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'No, gracias!',
          confirmButtonText: 'Sí, por favor!',
        }).then(async (answer) => {
          if (answer.isConfirmed && body.msgTitle === 'Contraseña incorrecta') {
            const resp = await fetchSinToken(
              'client/re-send-password',
              { email },
              'POST'
            )
            const body = await resp.json()

            if (!body.ok) {
              Swal.fire(
                'Error',
                'Hubo un problema al enviar el email, intente más tarde.',
                'error'
              )
            } else {
              Swal.fire({
                title: body.msgTitle,
                html: body.msgBody,
                icon: 'success',
                confirmButtonText: 'Gracias!',
              })
            }
          } else if (
            answer.isConfirmed &&
            body.msgTitle === 'Usuario inactivo'
          ) {
            const resp = await fetchSinToken(
              'client/re-send-secret-token',
              { email },
              'POST'
            )
            const body = await resp.json()

            if (!body.ok) {
              Swal.fire(
                'Error',
                'Hubo un problema al enviar el email, intente más tarde.',
                'error'
              )
            } else {
              Swal.fire({
                title: body.msgTitle,
                html: body.msgBody,
                icon: 'success',
                confirmButtonText: 'Gracias!',
              })
            }
          }
        })
      } else {
        Swal.fire({
          title: body.msgTitle,
          html: body.msgBody,
          icon: 'error',
          confirmButtonText: 'Entendido!',
        })
      }
    }
  }
}

export const loginClient = (client) => {
  localStorage.clear()
  localStorage.setItem('loggedClient', JSON.stringify(client))
  return { type: types.clientLogin, payload: client }
}

export const startLogoutClient = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(appointmentLogout())
    dispatch(logoutClient())
  }
}

const logoutClient = () => ({ type: types.clientLogout })
