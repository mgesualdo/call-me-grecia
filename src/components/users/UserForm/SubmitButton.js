import React from 'react'
import Spinner from '../../ui/Spinner'

const SubmitButton = ({ addingUser, loading }) => {
  console.log({ loading })
  return (
    <div className='form-group text-center mt-4'>
      <button type='submit' className='btn btn-submit'>
        {loading && <Spinner />}

        {addingUser && !loading && (
          <span>
            <i className='fas fa-user-plus mr-2' />
            Crear usuario
          </span>
        )}
        {!addingUser && !loading && (
          <span>
            <i className='fas fa-save mr-2' />
            Guardar cambios
          </span>
        )}
      </button>
    </div>
  )
}

export default SubmitButton
