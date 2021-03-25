import React from 'react'
import { useSelector } from 'react-redux'
import AppointmentPrice from '../clients/AppointmentPrice'
import ImageAndName from '../ui/ImageAndName'
import { differenceInMinutes, parseISO } from 'date-fns'

import './calendarAppointment.css'

export const CalendarAppointment = ({ event }) => {
  const { loggedClient } = useSelector((state) => state.auth)

  let hasReserved = event.hasReserved

  let reservationTimeExpired =
    differenceInMinutes(parseISO(event.createdAt), new Date()) > 30

  console.log({ created: parseISO(event.createdAt), now: new Date() })

  return (
    <>
      {loggedClient ? (
        <div className='appointment-container-client smaller'>
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
        <div className='appointment-container-client'>
          <ImageAndName
            name={event.client.name}
            imageName={event.client.avatarName}
            client
            smallImage
            bold
            color={!hasReserved && !reservationTimeExpired ? '#333' : '#fff'}
          />
          <ImageAndName
            name={event.service.name}
            imageName={event.service.images[0]}
            smallImage
            bold
            color={!hasReserved && !reservationTimeExpired ? '#333' : '#fff'}
          />
          <AppointmentPrice
            price={event.price}
            bold
            color={!hasReserved && !reservationTimeExpired ? '#333' : '#fff'}
          />
        </div>
      )}
    </>
  )
}
