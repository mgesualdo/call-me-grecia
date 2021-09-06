import React, { useEffect } from 'react'
import { UserNavbar } from '../ui/UserNavbar'

import './homeScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { UserCalendar } from '../calendar/UserCalendar'
import Appointment from '../clients/Appointment'
import { clearActiveAppointment } from '../../actions/appointment'
import { setSelectedService } from '../../actions/services'
import SearchableDropDownServices from '../ui/DropDowns/SearchableDropDownServices'
import UsersToChoose from '../users/UsersToChoose'
import { setSelectedUser } from '../../actions/users'
import { compareAsc } from 'date-fns'

const ChangeAppointmentDateScreen = () => {
  const { selectedService } = useSelector((state) => state.service)
  const { loggedUser } = useSelector((state) => state.auth)
  const { activeAppointment } = useSelector((state) => state.user)

  const userServices = loggedUser.services
    .filter((s) => s.service._id !== activeAppointment.service._id)
    .map((s) => s.service)

  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('activeAppointment', JSON.stringify(activeAppointment))
    dispatch(setSelectedService(activeAppointment.service._id))

    return () => {
      localStorage.removeItem('activeAppointment')
      dispatch(clearActiveAppointment())
    }
  }, [])

  useEffect(() => {
    dispatch(setSelectedService(activeAppointment.service._id))
    dispatch(setSelectedUser(activeAppointment.artist._id))

    return () => {
      localStorage.removeItem('activeAppointment')
      setSelectedService(null)
      setSelectedUser(null)
    }
  }, [])
  console.log({ activeAppointment })
  return (
    <>
      <UserNavbar />
      <div className='container-seleccion-turnos'>
        <div>
          <h2
            style={{
              fontWeight: 'bolder',
              marginTop: '0.5rem',
              marginLeft: '0.2rem !important',
              textDecoration: 'underline',
            }}
          >
            {activeAppointment?.client.name}{' '}
            {activeAppointment?.client.lastname}
          </h2>
          <h4 className='mt-3 mb-2'>Editando el siguiente turno:</h4>
          <Appointment appointment={activeAppointment} smaller />
          <div className='servicios-usuarios'>
            <SearchableDropDownServices smaller userServices={userServices} />
            <UsersToChoose defaultSelectedUser={activeAppointment.artist._id} />
          </div>
        </div>

        <UserCalendar cursorPointer={true} show smaller />
      </div>
    </>
  )
}

export default ChangeAppointmentDateScreen
