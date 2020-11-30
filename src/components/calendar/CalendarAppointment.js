import React from 'react'

export const CalendarAppointment = ({ appointment }) => {
  const { client } = appointment

  return (
    <div>
      <strong> Hola </strong>
      <span>- {client} </span>
    </div>
  )
}
