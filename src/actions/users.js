import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import Swal from 'sweetalert2'
import { prepareAppointments } from '../helpers/prepareAppointments'
import { uiLoading, uiLoadingDeleting } from './ui'

export const getUsers = () => {
  return async (dispatch) => {
    const resp = await fetchSinToken('user/', {}, 'GET')
    const body = await resp.json()

    if (body.ok) {
      dispatch({ type: types.getUsers, payload: body.users })
    } else {
      Swal.fire('Error', 'No se pudieron obtener los artistas', 'error')
    }
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
    dispatch(uiLoading(true))
    const resp = await fetchSinToken('user/', user, 'POST')
    const body = await resp.json()

    if (body.ok) {
      // Swal.fire('Excelente!', 'Usuario creado con éxito', 'success')
      dispatch(getUsers())
    } else {
      Swal.fire('Error', 'No fue posible crear el Usuario', 'error')
    }
    dispatch(uiLoading(false))
  }
}

export const updateUser = (user) => {
  return async (dispatch) => {
    dispatch(uiLoading(true))
    const resp = await fetchSinToken(`user/${user._id}`, user, 'PUT')
    const body = await resp.json()

    if (body.ok) {
      // Swal.fire('Excelente!', 'Usuario actualizado con éxito', 'success')
      dispatch(getUsers())
    } else {
      Swal.fire('Error', 'No fue posible actualizar el Usuario', 'error')
    }
    // dispatch(uiLoading(false))
  }
}

export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch(uiLoadingDeleting({ value: true, idBeingDeleted: userId }))
    const resp = await fetchSinToken(`user/${userId}`, {}, 'DELETE')
    const body = await resp.json()

    if (body.ok) {
      Swal.fire('Excelente!', 'Usuario eliminado con éxito', 'success')
      dispatch(getUsers())
    } else {
      Swal.fire('Error', body.message, 'error')
    }
    dispatch(uiLoadingDeleting({ value: false, idBeingDeleted: null }))
  }
}

export const getUserAppointments = (userId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(`user/${userId}/appointments`, {}, 'GET')
      const body = await resp.json()
      const appointments = prepareAppointments(body.appointments)

      if (body.ok) {
        dispatch({ type: types.userAppointments, payload: appointments })
      } else {
        Swal.fire(
          'Error',
          'No se pudieron obtener los turnos del artista',
          'error'
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const setSelectedUser = (userId) => ({
  type: types.userSelected,
  payload: userId,
})
