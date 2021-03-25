import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

export const EditAppointmentFab = () => {
  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(uiOpenModal())
  }

  return (
    <button className='btn btn-warning fab-warning' onClick={handleEdit}>
      <i className='fas fa-edit'></i>
      <span> Editar turno </span>
    </button>
  )
}
