import React from 'react'

import './payments.css'
import Payment from './Payment'
import PaymentsBalance from './PaymentsBalance'
import { calculateBalance } from '../../helpers/calculateBalance'

const Payments = ({ payments, price, hasReserved, reservationTimeExpired }) => {
  return (
    <>
      <h6 className='mt-3 font-weight-bolder'>
        {payments.length > 0 ? 'Pagos' : 'No se ha realizado ningún pago'}
      </h6>
      <div>
        {payments.map((p) => (
          <Payment
            payment={p}
            hasReserved={hasReserved}
            reservationTimeExpired={reservationTimeExpired}
            balance={calculateBalance(price, payments)}
            key={p._id}
            price={price}
          />
        ))}
      </div>
      {payments.length > 0 && (
        <PaymentsBalance price={price} payments={payments} />
      )}
    </>
  )
}

export default Payments
