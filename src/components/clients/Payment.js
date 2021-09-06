import React from 'react'
import moment from 'moment'
import WarningIcon from '../ui/Icons/WarningIcon'
import DangerIcon from '../ui/Icons/DangerIcon'
import SuccessIcon from '../ui/Icons/SuccessIcon'

import './payment.css'
import PayPendingPaymentButton from './PayPendingPaymentButton'
import InfoIcon from '../ui/Icons/InfoIcon'

const Payment = ({ payment, hasReserved, balance, reservationTimeExpired }) => {
  const { status, createdAt, amount, method } = payment

  console.log({ createdAt })

  return (
    <div className='payment-info'>
      <div className='payment-time-and-status-container'>
        {method === 'Mercado Pago' ? (
          <>
            <i className='fa fa-clock appointment-icn'></i>
            <span className='payment-detail time'>
              {moment(createdAt).format('ddd DD/MM HH:mm')}
            </span>
          </>
        ) : (
          <>
            <i className='fa fa-clock appointment-icn'></i>
            <small>Pago en efectivo</small>
          </>
        )}
        {status === 'PENDIENTE' ? (
          <WarningIcon title='Pago pendiente' />
        ) : status === 'APROBADO' ? (
          <SuccessIcon title='Pago aprobado' />
        ) : status === 'DEVUELTO' ? (
          <InfoIcon title='Pago devuelto' />
        ) : (
          <DangerIcon title='Pago rechazado' />
        )}
      </div>
      <div>
        <div className='pending-payment-container'>
          <PayPendingPaymentButton
            show={!hasReserved && balance > 0 && !reservationTimeExpired}
            payment={payment}
            text='Abonar'
          />

          <span className='payment-made payment-detail'>${amount}</span>
        </div>
      </div>
    </div>
  )
}

export default Payment
