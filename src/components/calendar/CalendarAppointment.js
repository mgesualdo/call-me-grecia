import React from 'react'
import { useSelector } from 'react-redux'
import AppointmentPrice from '../clients/AppointmentPrice'
import ImageAndName from '../ui/ImageAndName'
import { differenceInMinutes, parseISO } from 'date-fns'

import './calendarAppointment.css'
import { calculateBalance } from '../../helpers/calculateBalance'

export const CalendarAppointment = ({ event }) => {
  const { loggedClient } = useSelector((state) => state.auth)

  let hasReserved = event.hasReserved

  let reservationTimeExpired =
    differenceInMinutes(new Date(), parseISO(event.createdAt)) > 30

  const clientHasAttended = event?.hasAttended

  const balance = calculateBalance(event?.price, event?.payments ?? [])

  return (
    <>
      {loggedClient ? (
        <div className={`appointment-container-client smaller`}>
          {loggedClient._id === event?.client?._id ? (
            <>
              <ImageAndName
                name={event.service.name}
                imageName={event.service.images[0]}
                smallImage
                bold
                color={
                  !hasReserved && !reservationTimeExpired ? '#333' : '#fff'
                }
              />
              <AppointmentPrice
                price={event.price}
                bold
                smallFont
                color={
                  !hasReserved && !reservationTimeExpired ? '#333' : '#fff'
                }
              />
            </>
          ) : (
            <p className='m-0'>No disp.</p>
          )}
        </div>
      ) : (
        <div
          className={`appointment-container-client smaller ${
            event.service.duration <= 30 && 'move-image-and-name'
          } ${event.service.duration >= 45 && 'wider'}`}
        >
          <ImageAndName
            name={`${event.client?.lastname?.toUpperCase()}, ${
              event.client.name
            }`}
            imageName={event.client.avatarName}
            client
            smallImage
            bold
            color={
              ((!hasReserved && !reservationTimeExpired) || balance > 0) &&
              clientHasAttended
                ? '#333'
                : '#fff'
            }
            eventDuration={event.duration}
          />
          <ImageAndName
            name={event.service.name}
            imageName={event.service.images[0]}
            smallImage
            bold
            color={
              ((!hasReserved && !reservationTimeExpired) || balance > 0) &&
              clientHasAttended
                ? '#333'
                : '#fff'
            }
            eventDuration={event.service.duration}
          />
          <AppointmentPrice
            price={event.price}
            bold
            color={
              ((!hasReserved && !reservationTimeExpired) || balance > 0) &&
              clientHasAttended
                ? '#333'
                : '#fff'
            }
          />
        </div>
      )}
    </>
  )
}
