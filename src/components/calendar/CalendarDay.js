import React from 'react'

import './calendarDay.css'

export const CalendarDay = ({ event }) => {
  const { service, client } = event

  return (
    <div className='d-block '>
      <small>
        {client.name} {service.name}
      </small>
    </div>
  )
}
