import React from 'react'
import './roles.css'

const UserRoles = ({ acceptedRoles, selectedRoles, handleChange }) => {
  return (
    <div className='roles-container'>
      <div className='d-flex align-items-center mb-3'>
        <h3 className='mr-3 mt-3'>Roles</h3>
        {acceptedRoles.map((rol) => (
          <div className='form-check roles-input-container' key={rol}>
            <div className='mr-3'>
              <input
                className='form-check-input'
                name='role'
                type='checkbox'
                onChange={handleChange}
                value={rol}
                id={rol}
                checked={selectedRoles.includes(rol)}
              />
              <label className='form-check-label' name='role' htmlFor={rol}>
                {rol}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserRoles
