import React from 'react'
import { calculateBalance } from '../../helpers/calculateBalance'

import './paymentsBalance.css'

const PaymentsBalance = ({ price, payments }) => {
  return (
    <>
      <div className='divisor'>
        <hr />
      </div>
      <div className='payment-info total'>
        <span>Saldo restante</span>
        <span className='payment-made saldo payment-detail'>
          ${calculateBalance(price, payments)}
        </span>
      </div>
    </>
  )
}

export default PaymentsBalance
