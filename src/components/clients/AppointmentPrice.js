import React from 'react'
import './appointmentPrice.css'

const AppointmentPrice = ({
  price,
  reservationCost,
  bold,
  color,
  smallFont,
}) => {
  return (
    <div className='price-container'>
      <span
        className={`price ${smallFont && 'small-font'}`}
        style={{
          fontWeight: `${bold ? 'bold' : 'normal'}`,
          color,
        }}
      >
        ${price}
      </span>
      {!!reservationCost && (
        <span className='reservation-cost'>Seña ${reservationCost}</span>
      )}
    </div>
  )
}

export default AppointmentPrice
