import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import Swal from 'sweetalert2'

export const getServices = (searchTerm) => {
  return async (dispatch) => {
    try {
      let url = searchTerm ? `service/?search=${searchTerm}` : 'service/'

      const resp = await fetchSinToken(url, {}, 'GET')
      const body = await resp.json()

      if (body.ok) {
        dispatch({ type: types.getServices, payload: body.services })
      } else {
        Swal.fire('Error', 'No se pudieron obtener los servicios', 'error')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const setSelectedService = (serviceId) => ({
  type: types.serviceSelected,
  payload: serviceId,
})

export const deleteService = (serviceId) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(`service/${serviceId}`, {}, 'DELETE')
    const body = await resp.json()
    if (body.ok) {
      // Swal.fire('Excelente!', 'Usuario eliminado con éxito', 'success')
      dispatch(getServices())
    } else {
      Swal.fire('Error', 'No fue posible eliminar el Usuario', 'error')
    }
  }
}
