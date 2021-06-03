import React from 'react'
import { calculateBalance } from '../../helpers/calculateBalance'
import './appointmentStatus.css'
import { useSelector } from 'react-redux'
import AppointmentCalcelledMessage from './AppointmentCalcelledMessage'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { parseISO } from 'date-fns'

const AppointmentStatus = ({
  appointment,
  hasReserved,
  reservationTimeExpired,
}) => {
  const { loggedUser } = useSelector((state) => state.auth)
  const { payments, price, createdByClient } = appointment
  const balance = calculateBalance(price, payments)

  let minutesLeftToPay =
    30 - differenceInMinutes(new Date(), parseISO(appointment.createdAt))

  return (
    <>
      {(balance < price || !createdByClient) && (
        <div className='appointment-status-container'>
          <i className='fas fa-calendar-check success-icn'></i>
          Turno confirmado
        </div>
      )}
      {!hasReserved && reservationTimeExpired && createdByClient && (
        <AppointmentCalcelledMessage />
      )}
      {!reservationTimeExpired &&
        balance === price &&
        createdByClient &&
        !hasReserved && (
          <div className='appointment-status-container'>
            <i className='fas fa-hourglass-half info-icn'></i>
            <span>
              {!!loggedUser ? 'Le' : 'Te'}{' '}
              {minutesLeftToPay === 1 ? 'queda' : 'quedan'} {minutesLeftToPay}'
              para reservar
            </span>
          </div>
        )}
    </>
  )
}

export default AppointmentStatus
