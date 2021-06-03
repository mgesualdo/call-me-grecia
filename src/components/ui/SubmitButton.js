import React from 'react'

import Spinner from './Spinner'

const SubmitButton = ({ adding, loading, addingText, editingText }) => {
  return (
    <div className='form-group text-center mt-4'>
      <button type='submit' className='btn btn-submit'>
        {loading && <Spinner />}
        {adding && !loading && (
          <span>
            <i className='fas fa-concierge-bell mr-2' />
            {addingText}
          </span>
        )}
        {!adding && !loading && (
          <span>
            <i className='fas fa-save mr-2' />
            {editingText}
          </span>
        )}
      </button>
    </div>
  )
}

export default SubmitButton
