import React from 'react'
import moment from 'moment'
import './appointmentTime.css'

const AppointmentTime = ({ start }) => {
  return (
    <span className='appointment-date'>
      <i className='fa fa-clock appointment-icn'></i>
      {moment(start).format('ddd DD/MM HH:mm')}
    </span>
  )
}

export default AppointmentTime
