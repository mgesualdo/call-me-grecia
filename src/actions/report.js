import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import Swal from 'sweetalert2'

export const getAppointmentsPerArtist = () => {
  return async (dispatch) => {
    const resp = await fetchSinToken('report/appointments', {}, 'GET')
    const body = await resp.json()

    console.log({ body })

    if (body.ok) {
      dispatch({
        type: types.getAppointmentsPerArtistReport,
        payload: {
          weeklyAppointments: body.appointments,
          dailyAppointments: body.dailyAppointments,
          monthlyAppointments: body.monthlyAppointments,
        },
      })
    } else {
      Swal.fire('Error', 'No se pudieron obtener los artistas!', 'error')
    }
  }
}
