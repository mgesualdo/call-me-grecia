import React from 'react'

const PaymentType = ({ paymentType, setPaymentType, type }) => {
  return (
    <div className='form-check service-input-container'>
      <input
        className='form-check-input'
        type='checkbox'
        onChange={() => setPaymentType(type)}
        value={type}
        id={type}
        checked={type === paymentType}
      />
      <label className='form-check-label' htmlFor={type}>
        {type}
      </label>
    </div>
  )
}

export default PaymentType
