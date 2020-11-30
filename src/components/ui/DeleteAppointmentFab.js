import React from 'react'
import { useDispatch } from 'react-redux'
import { appointmentStartDelete } from '../../actions/appointment'

export const DeleteAppointmentFab = () => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(appointmentStartDelete())
  }

  return (
    <button className='btn btn-danger fab-danger' onClick={handleDelete}>
      <i className='fas fa-trash'></i>
      <span> Borrar turno </span>
    </button>
  )
}
