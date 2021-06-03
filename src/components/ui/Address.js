import React from 'react'
import './address.css'

const Address = () => {
  return (
    <div className='address-container'>
      <i className='fas fa-map-marker-alt address-pin'></i>
      <a
        href='https://www.google.com.ar/maps/place/-34.928523, -57.955899'
        className='address-link'
        target='_blank'
      >
        Calle 57 N° 1141 e/ 17 y 18
      </a>
    </div>
  )
}

export default Address
