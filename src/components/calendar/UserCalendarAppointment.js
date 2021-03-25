import React from 'react'

export const UserCalendarAppointment = React.memo(({ event }) => {
  return (
    <div className='d-flex flex-column'>
      <strong>{`${event.client?.lastname} ${event.client?.name}`}</strong>
      <span>{event.service?.name}</span>
    </div>
  )
})
