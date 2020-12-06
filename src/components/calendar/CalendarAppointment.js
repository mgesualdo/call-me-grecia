import React from 'react'

export const CalendarAppointment = ({ event }) => {
  return (
    <div>
      <strong> {event.artist.name} </strong>
      <span>{event.service.name}</span>
    </div>
  )
}
