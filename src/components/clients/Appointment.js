import React from 'react'

import './appointment.css'
import ImageAndName from '../ui/ImageAndName'
import AppointmentTime from './AppointmentTime'
import AppointmentPrice from './AppointmentPrice'
import Payments from './Payments'
import PaymentActions from './PaymentActions'
import AppointmentStatus from './AppointmentStatus'
import { NewPaymentModal } from '../payments/NewPaymentModal'
import { differenceInMinutes, parseISO } from 'date-fns'

const Appointment = ({ appointment }) => {
  const { avatarName, name: userName } = appointment.artist

  const { images, name: serviceName } = appointment.service

  const reservationTimeExpired =
    differenceInMinutes(new Date(), parseISO(appointment.createdAt)) > 30

  return (
    <>
      <div className='appointment-container'>
        <div>
          <div className='user-and-date-container'>
            <ImageAndName name={userName} imageName={avatarName} user />
            <AppointmentTime start={appointment.start} />
          </div>
          <div className='service-and-price-modal'>
            <ImageAndName name={serviceName} imageName={images[0]} />
            <AppointmentPrice price={appointment.price} />
          </div>
        </div>
        <Payments
          payments={appointment.payments}
          price={appointment.price}
          hasReserved={appointment.hasReserved}
          reservationTimeExpired={reservationTimeExpired}
        />

        <div className='payment-footer mt-3'>
          <AppointmentStatus
            appointment={appointment}
            hasReserved={appointment.hasReserved}
            reservationTimeExpired={reservationTimeExpired}
          />
          <PaymentActions
            appointment={appointment}
            show={!appointment.hasReserved && !reservationTimeExpired}
          />
        </div>
        <NewPaymentModal />
      </div>
    </>
  )
}

export default Appointment
