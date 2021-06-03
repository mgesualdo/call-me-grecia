import React from 'react'
import { useSelector } from 'react-redux'
import './services.css'

const UserServices = ({ services, handleServiceChange, handlePriceChange }) => {
  const { services: allServices } = useSelector((state) => state.service)

  return (
    <div className='user-services-container'>
      <h4>Servicios</h4>
      {allServices.map((service) => (
        <div className='form-check service-input-container' key={service._id}>
          <div>
            <input
              className='form-check-input'
              type='checkbox'
              onChange={handleServiceChange}
              value={service._id}
              id={service._id}
              checked={services.map((s) => s.service).includes(service._id)}
            />
            <label className='form-check-label' htmlFor={service._id}>
              {service.name}
            </label>
          </div>

          {services.some((s) => s.service === service._id) && (
            <input
              type='number'
              step={50}
              min={0}
              value={services.find((s) => s.service === service._id).price}
              onChange={(e) => handlePriceChange(e, service._id)}
              className='price-input'
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default UserServices
