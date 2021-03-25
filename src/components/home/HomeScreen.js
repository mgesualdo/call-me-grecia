import React, { useEffect } from 'react'

import Swal from 'sweetalert2'
import { MyCalendar } from '../calendar/MyCalendar'

import { Navbar } from '../ui/Navbar'
import SearchableDropDownServices from '../ui/DropDowns/SearchableDropDownServices'

import UsersToChoose from '../users/UsersToChoose'

import './homeScreen.css'
import { useSelector } from 'react-redux'
import ServiceInfo from '../services/ServiceInfo'

const HomeScreen = () => {
  const { selectedService } = useSelector((state) => state.service)
  useEffect(() => {
    const queryParameters = window.location.search.toString()

    if (queryParameters) {
      const newStatus = queryParameters
        .split('status')[1]
        .split('&')[0]
        .replace('=', '')

      if (newStatus === 'approved') {
        Swal.fire('Perfecto!', 'Tu turno fue reservado con éxtio!', 'success')
      } else if (newStatus === 'pending') {
        Swal.fire(
          'Todavía falta!',
          'Tu pago está en estado PENDIENTE, revisá en unas horas!',
          'warning'
        ).then(() => {
          return
        })
      } else {
        Swal.fire(
          'Error!',
          'Hubo un problema con tu pago, no te pudimos reservar el turno!',
          'error'
        )
      }
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='container-seleccion-turnos'>
        <div className='servicios-usuarios'>
          <SearchableDropDownServices />
          {selectedService && <ServiceInfo service={selectedService} />}
          <UsersToChoose />
        </div>
        <div id='calendario'>
          <MyCalendar />
        </div>
      </div>
    </>
  )
}

export default HomeScreen
