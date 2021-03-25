import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner'

const DeleteButton = ({ handleDelete, idToDelete }) => {
  const { loadingDeleting, idBeingDeleted } = useSelector((state) => state.ui)
  return (
    <button className='btn btn-danger' onClick={() => handleDelete(idToDelete)}>
      {loadingDeleting && idToDelete === idBeingDeleted ? (
        <Spinner small />
      ) : (
        <i className='fas fa-trash'></i>
      )}
    </button>
  )
}

export default DeleteButton
