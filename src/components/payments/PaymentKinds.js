import React from 'react'
import './paymentKinds.css'

const PaymentKinds = ({ acceptedKinds, selectedKind, handleSelect }) => {
  return (
    <div className='roles-container'>
      <div className='roles-input-container'>
        {acceptedKinds.map((kind) => (
          <div className='form-check roles-input-container' key={kind}>
            <div>
              <input
                className='form-check-input'
                name='payment-kind'
                type='checkbox'
                onChange={() => null}
                value={kind}
                id={kind}
                checked={kind === selectedKind}
              />
              <label
                onClick={() => handleSelect(kind)}
                className='form-check-label'
                name='payment-kind'
                htmlFor={kind}
              >
                {kind}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentKinds
