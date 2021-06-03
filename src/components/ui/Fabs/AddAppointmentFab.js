import React from 'react'
import { useHistory } from 'react-router-dom'
import './addAppointmentFab.css'

export const AddAppointmentFab = () => {
  const history = useHistory()

  const handleAdd = () => {
    history.push('/users/appointments/create')
  }

  return (
    <>
      <button className='fab-success' onClick={handleAdd}>
        <i className='far fa-calendar-plus'></i>
      </button>
    </>
  )
}
