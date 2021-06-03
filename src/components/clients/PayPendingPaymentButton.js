import React, { useState } from 'react'
import Spinner from '../ui/Spinner'

const PayPendingPaymentButton = ({ show, payment, text }) => {
  const [loading, setLoading] = useState(false)

  let init_point =
    'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=' +
    payment.preference_id

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      window.location = init_point
      setLoading(false)
    }, 200)
  }

  return (
    show && (
      <button className='pay' onClick={handleClick}>
        {loading ? <Spinner smallest /> : text}
      </button>
    )
  )
}

export default PayPendingPaymentButton
