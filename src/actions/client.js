import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import Swal from 'sweetalert2'
import { prepareAppointments } from '../helpers/prepareAppointments'
import { uiLoading, uiLoadingClients, uiLoadingUpdatingClient } from './ui'
import { loginClient } from './auth'

export const getClientAppointments = (clientId) => {
  return async (dispatch, getState) => {
    const { loggedUser } = getState().auth
    dispatch(uiLoading(true))
    const resp = await fetchSinToken(
      `client/${clientId}/appointments`,
      {},
      'GET'
    )
    const body = await resp.json()

    let appointments = prepareAppointments(body.appointments)

    if (!!loggedUser && !loggedUser.roles.includes('ADMIN')) {
      console.log({ appointments })
      appointments = appointments.filter((a) => a.artist._id === loggedUser._id)
    }

    localStorage.setItem('clientAppointments', JSON.stringify(appointments))

    if (body.ok) {
      dispatch({ type: types.clientAppointments, payload: appointments })
    } else {
      Swal.fire(
        'Error',
        'No se pudieron obtener los turnos del artista',
        'error'
      )
    }
    dispatch(uiLoading(false))
  }
}

export const getClients = (searchTerm) => {
  return async (dispatch) => {
    dispatch(uiLoadingClients(true))
    const url = searchTerm ? `client/?search=${searchTerm}` : 'client/'
    const resp = await fetchSinToken(url, {}, 'GET')
    const body = await resp.json()
    const clients = body.clients

    if (body.ok) {
      dispatch({ type: types.getClients, payload: clients })
    } else {
      Swal.fire('Error', 'No se pudo obtener el listado de clients', 'error')
    }
    dispatch(uiLoadingClients(false))
  }
}

export const updateClient = (formData, _id) => {
  return async (dispatch) => {
    try {
      dispatch(uiLoadingUpdatingClient(true))
      const resp = await fetchSinToken(`client/${_id}`, formData, 'PUT', true)
      const body = await resp.json()
      console.log('QUE ONDA')

      if (body.ok) {
        dispatch(loginClient(body.updatedClient))
        Swal.fire('Listo!', `Tus datos actualizados con éxito!`, 'success')
      } else {
        Swal.fire('Error', 'Error al actualizar los datos', 'error')
      }
      dispatch(uiLoadingUpdatingClient(false))
    } catch (error) {
      console.log(error)
      Swal.fire('Error', error.msg, 'error')
    }
  }
}

export const changeClientStatus = (status, _id, setClientStatus) => {
  return async (dispatch) => {
    try {
      dispatch(uiLoadingUpdatingClient(true))

      const resp = await fetchSinToken(
        `client/change-status/${_id}`,
        { status },
        'PUT'
      )
      const body = await resp.json()

      if (body.ok) {
        setClientStatus(status)
        Swal.fire(
          'Listo!',
          `Estado del cliente actualizado con éxito!`,
          'success'
        )
      } else {
        Swal.fire('Error', 'Error al actualizar los datos', 'error')
      }
      dispatch(uiLoadingUpdatingClient(false))
    } catch (error) {
      console.log(error)
      Swal.fire('Error', error.msg, 'error')
    }
  }
}

export const setSelectedClient = (clientId) => ({
  type: types.clientSelected,
  payload: clientId,
})
