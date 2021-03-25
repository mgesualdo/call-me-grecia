import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  appointmentStartCancelation,
  clearActiveAppointment,
} from '../../actions/appointment'
import { getUserAppointments } from '../../actions/users'

export const DeleteAppointmentFab = () => {
  const { loggedUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(appointmentStartCancelation())
    dispatch(getUserAppointments(loggedUser._id))
    dispatch(clearActiveAppointment())
  }

  return (
    <button className='btn btn-danger fab-danger' onClick={handleDelete}>
      <i className='fas fa-trash'></i>
      <span> Cancelar turno </span>
    </button>
  )
}
