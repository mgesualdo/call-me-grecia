import React from 'react'

const Service = ({ name, description, price }) => {
  return (
    <div className='service-container p-3 d-flex flex-column justify-content-between '>
      <h3 className='text-center service-name'>{name}</h3>
      <p className='pt-3 text-center service-text '>{description}</p>
      <h3 className='text-center price text-primary'>${price}</h3>
    </div>
  )
}

export default Service
