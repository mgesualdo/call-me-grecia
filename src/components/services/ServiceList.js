import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

import { fetchSinToken } from '../../helpers/fetch'

const ServiceList = ({ serviceValue, handleInputChange }) => {
  const [services, setServices] = useState([])

  const getServices = useCallback(async () => {
    const resp = await fetchSinToken('service/', {}, 'GET')
    const data = await resp.json()

    setServices(data.services)
  }, [])

  useEffect(() => {
    getServices()
  }, [getServices])

  return (
    <>
      <select
        name='service'
        value={serviceValue}
        onChange={handleInputChange}
        className='form-control form-control-lg'
      >
        <option value=''></option>
        {services.map((service) => (
          <option value={`${service._id}`} key={service._id}>
            {service.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default ServiceList
