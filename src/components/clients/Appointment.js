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
import { CancelAppointmentFab } from '../ui/Fabs/CancelAppointmentFab'

const Appointment = ({ appointment, smaller = false, isClient = false }) => {
  const { avatarName, name: userName } = appointment.artist

  const { images, name: serviceName } = appointment.service

  const reservationTimeExpired =
    differenceInMinutes(new Date(), parseISO(appointment.createdAt)) > 30

  const paymentsToBeRefunded = appointment?.payments.filter(
    (p) =>
      differenceInMinutes(new Date(), parseISO(p.createdAt)) <= 1 &&
      p.status === 'APROBADO'
  )

  const paymentsToNotBeRefunded = appointment?.payments.filter(
    (p) =>
      differenceInMinutes(new Date(), parseISO(p.createdAt)) > 2 &&
      p.status === 'APROBADO'
  )

  console.log({
    yaPaso: differenceInMinutes(new Date(), new Date(appointment?.start)),
  })

  return (
    <>
      <div className='appointment-container'>
        {(((!reservationTimeExpired ||
          paymentsToBeRefunded?.length > 0 ||
          !appointment.createdByClient) &&
          !smaller) ||
          (isClient && !reservationTimeExpired)) &&
        differenceInMinutes(new Date(), new Date(appointment?.start)) < 0 ? (
          <CancelAppointmentFab
            appointment={appointment}
            paymentsToBeRefunded={paymentsToBeRefunded}
            paymentsToNotBeRefunded={paymentsToNotBeRefunded}
          />
        ) : null}
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

          {!smaller && (
            <PaymentActions
              appointment={appointment}
              show={!appointment.hasReserved || !reservationTimeExpired}
            />
          )}
        </div>
        <NewPaymentModal />
      </div>
    </>
  )
}

export default Appointment
