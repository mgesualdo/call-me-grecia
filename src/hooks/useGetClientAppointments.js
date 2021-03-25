import { useEffect } from 'react'
import { useState } from 'react'
import { fetchSinToken } from '../helpers/fetch'
import { prepareAppointments } from '../helpers/prepareAppointments'

const useGetClientAppointments = (clientId) => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetchSinToken(`client/${clientId}/appointments`, {}, 'GET')
      .then((resp) => resp.json())
      .then(({ appointments }) => {
        const preparedAppointments = prepareAppointments(appointments)
        setAppointments(preparedAppointments)
      })
  }, [clientId])

  return [appointments]
}

export default useGetClientAppointments
