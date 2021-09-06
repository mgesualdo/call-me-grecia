import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchSinToken } from '../../helpers/fetch'
import Appointment from './Appointment'
import './appointmentsScreen.css'
import { useParams } from 'react-router'
import { UserNavbar } from '../ui/UserNavbar'
import { format } from 'date-fns'

const UserAppointmentsByDateScreen = () => {
  const [userAppointments, setUserAppointments] = useState()
  const [otherUsersAppointments, setOtherUsersAppointments] = useState()
  const { loggedUser } = useSelector((state) => state.auth)

  const { selectedDate } = useParams()

  const formattedDate = format(new Date(selectedDate), 'dd-MM-yyyy')

  useEffect(() => {
    fetchSinToken(`appointment/${selectedDate}`)
      .then(async (res) => await res.json())
      .then((data) => {
        if (loggedUser && loggedUser.roles.includes('ADMIN')) {
          setOtherUsersAppointments(
            data.appointments.filter((a) => a.artist._id !== loggedUser?._id) ||
              []
          )
        }
        setUserAppointments(
          data.appointments.filter((a) => a.artist._id === loggedUser?._id)
        )
      })
  }, [selectedDate])

  console.log({ otherUsersAppointments: otherUsersAppointments?.length })

  return (
    <div>
      <UserNavbar />
      <div className='appointment-screen-container'>
        <div className='d-flex align-items-center mb-3'>
          <h3 className='mr-5'>
            <span role='img' aria-label='Emoji calendario'>
              📅
            </span>{' '}
            Mis turnos{' '}
            <small style={{ color: '#2277ff', fontWeight: 'bold' }}>
              {formattedDate}
            </small>
          </h3>
        </div>
        <div
          className='appointments-container'
          style={{ paddingBottom: '3rem' }}
        >
          {userAppointments?.length > 0 &&
            userAppointments.map((appointment) => (
              <Appointment
                key={appointment._id}
                appointment={appointment}
                isClient={false}
                needsClientInfo
              />
            ))}
        </div>
        <div className='d-flex align-items-center mb-3'>
          <h3 className='mr-5'>
            <span role='img' aria-label='Emoji calendario'>
              📅
            </span>{' '}
            Turnos de mi staff{' '}
            <small style={{ color: '#2277ff', fontWeight: 'bold' }}>
              {formattedDate}
            </small>
          </h3>
        </div>
        <div className='appointments-container'>
          {loggedUser &&
            loggedUser.roles.includes('ADMIN') &&
            otherUsersAppointments?.length > 0 &&
            otherUsersAppointments.map((appointment) => (
              <Appointment
                key={appointment._id}
                appointment={appointment}
                isClient={false}
                needsClientInfo
              />
            ))}
          {otherUsersAppointments?.length == 0 && (
            <h4>Tu staff no tiene turnos en esta fecha</h4>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserAppointmentsByDateScreen
