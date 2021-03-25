import React from 'react'
import { paymentTypes } from '../../utils/constants'
import PaymentType from './PaymentType'

import './paymentTypesDropDown.css'

const PaymentTypesOptions = ({ paymentType, setPaymentType }) => {
  return (
    <div className='payment-container'>
      <h4>Reservar con</h4>
      <div className='payment-types'>
        {paymentTypes.map((type) => (
          <PaymentType
            key={type}
            type={type}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
          />
        ))}
      </div>
    </div>
  )
}

export default PaymentTypesOptions
