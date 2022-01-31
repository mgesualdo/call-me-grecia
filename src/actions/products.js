import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import Swal from 'sweetalert2'

export const getProducts = (searchTerm) => {
  return async (dispatch) => {
    try {
      let url = searchTerm ? `product/?search=${searchTerm}` : 'product/'

      console.log('GET PRODUCTS')

      const resp = await fetchSinToken(url, {}, 'GET')
      const body = await resp.json()

      console.log({ body, url })

      if (body.ok) {
        dispatch({ type: types.getProducts, payload: body.products })
      } else {
        Swal.fire('Error', 'No se pudieron obtener los servicios', 'error')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const setSelectedProduct = (productId) => ({
  type: types.productSelected,
  payload: productId,
})

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(`product/${productId}`, {}, 'DELETE')
    const body = await resp.json()
    if (body.ok) {
      // Swal.fire('Excelente!', 'Usuario eliminado con éxito', 'success')
      dispatch(getProducts())
    } else {
      Swal.fire('Error', 'No fue posible eliminar el Usuario', 'error')
    }
  }
}
