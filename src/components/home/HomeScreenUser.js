import React, { useEffect } from 'react'

import Swal from 'sweetalert2'

import { UserNavbar } from '../ui/UserNavbar'
import SearchableDropDownServices from '../ui/DropDowns/SearchableDropDownServices'

import './homeScreen.css'
import { useSelector } from 'react-redux'
import ClientsToChoose from '../clients/ClientsToChoose'
import { UserCalendar } from '../calendar/UserCalendar'

const HomeScreenUser = () => {
  const { loggedUser } = useSelector((state) => state.auth)

  const userServices = loggedUser.services.map((s) => s.service)

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
      <UserNavbar />
      <div className='container-seleccion-turnos'>
        <div className='servicios-usuarios'>
          <SearchableDropDownServices userServices={userServices} />

          <h3 className='mb-3'>Elegí un cliente</h3>
          <ClientsToChoose />
        </div>
        <div id='calendario'>
          <UserCalendar cursorPointer={true} />
        </div>
      </div>
    </>
  )
}

export default HomeScreenUser
