import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appointmentSetActive } from '../../actions/appointment'
import { uiOpenModal } from '../../actions/ui'
import { calculateBalance } from '../../helpers/calculateBalance'
import { fetchSinToken } from '../../helpers/fetch'
import Spinner from '../ui/Spinner'

const PaymentActions = ({ appointment, show }) => {
  const { loggedUser } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  const balance = calculateBalance(
    appointment?.price,
    appointment?.payments ?? []
  )

  const dispatch = useDispatch()

  const handleClick = async () => {
    try {
      if (loggedUser) {
        dispatch(appointmentSetActive(appointment))
        dispatch(uiOpenModal())
      } else {
        setLoading(true)
        const resp = await fetchSinToken(
          'mercadopago',
          {
            appointmentId: appointment._id,
            paymentInfo: {
              method: 'Mercado Pago',
              kind: 'PAGO TOTAL',
              amount: balance,
              status: 'PENDIENTE',
            },
          },
          'POST'
        )
        const { url } = await resp.json()
        window.location = url
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {show && balance > 0 && !loggedUser && (
        <button onClick={handleClick} className='pay pay-bigger'>
          {loading ? <Spinner /> : 'Abonar saldo'}
        </button>
      )}
      {show && balance > 0 && loggedUser && (
        <button onClick={handleClick} className='pay pay-bigger'>
          {loading ? <Spinner /> : 'Cargar pago'}
        </button>
      )}
    </>
  )
}

export default PaymentActions
