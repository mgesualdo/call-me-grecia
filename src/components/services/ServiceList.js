import React from 'react'

import { useSelector } from 'react-redux'

const ServiceList = ({ serviceValue, handleInputChange, isUser }) => {
  const { selectedUser, loggedUser } = useSelector((state) => state.auth)

  const user = isUser ? loggedUser : selectedUser

  return (
    <>
      <select
        name='service'
        value={serviceValue}
        onChange={handleInputChange}
        className='form-control'
      >
        <option value=''></option>
        {user.services.map(({ service }) => (
          <option value={service._id} key={service._id}>
            {service.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default ServiceList
