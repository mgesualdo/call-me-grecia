import React from 'react'
import { Navbar } from '../ui/Navbar'

import { useSelector } from 'react-redux'
import { fetchSinToken } from '../../helpers/fetch'
import Appointment from './Appointment'
import './appointmentsScreen.css'

const AppointmentsScreen = () => {
  const { clientAppointments } = useSelector((state) => state.client)

  const handleClick = async (appointment) => {
    if (appointment.payments[0].preference_id) {
      const baseUrlPreference =
        'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/?preference-id='
      window.location.href =
        baseUrlPreference + appointment.payments[0].preference_id
    } else {
      const resp = await fetchSinToken('mercadopago', appointment, 'POST')
      const { url } = await resp.json()
      window.location = url
    }
  }

  return (
    <div>
      <Navbar />
      <div className='appointment-screen-container'>
        <div className='d-flex align-items-center mb-3'>
          <h2 className='mr-5'>
            <span role='img' aria-label='Emoji calendario'>
              📅
            </span>{' '}
            Mis turnos
          </h2>
        </div>
        <div className='appointments-container'>
          {clientAppointments.length > 0 &&
            clientAppointments.map((appointment) => (
              <Appointment
                key={appointment._id}
                appointment={appointment}
                handleClick={handleClick}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default AppointmentsScreen
