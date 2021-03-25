import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment'
import Modal from 'react-modal'

import { uiCloseModal, uiLoading } from '../../actions/ui'
import { clearActiveAppointment } from '../../actions/appointment'

import { paymentKinds } from '../../utils/constants'

import '../calendar/calendarModal.css'
import './newPaymentModal.css'
import ImageAndName from '../ui/ImageAndName'
import AppointmentPrice from '../clients/AppointmentPrice'
import AppointmentTime from '../clients/AppointmentTime'
import Input from '../ui/Input'
import { fetchSinToken } from '../../helpers/fetch'
import PaymentKinds from './PaymentKinds'
import { calculateBalance } from '../../helpers/calculateBalance'
import { getClientAppointments } from '../../actions/client'

moment.locale('ar')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#root')

export const NewPaymentModal = () => {
  const { modalOpen } = useSelector((state) => state.ui)
  const { activeAppointment } = useSelector((state) => state.user)
  const { selectedClient } = useSelector((state) => state.client)

  const balance = calculateBalance(
    activeAppointment?.price,
    activeAppointment?.payments ?? []
  )

  const dispatch = useDispatch()

  const [paymentAmount, setPaymentAmout] = useState()
  const [paymentKind, setPaymentKind] = useState('Efectivo')

  const handleChange = (e) => {
    console.log(e)
    setPaymentAmout(e.target.value)
  }

  const handleSelectKind = (kind) => {
    console.log(kind)
    setPaymentKind(kind)
  }

  useEffect(() => {
    setPaymentAmout(balance)
  }, [balance])

  const closeModal = () => {
    dispatch(uiCloseModal())
    dispatch(clearActiveAppointment())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(uiLoading())
    await fetchSinToken(
      'mercadopago',
      {
        appointmentId: activeAppointment._id,
        paymentInfo: {
          method: paymentKind,
          kind: balance > paymentAmount ? 'PAGO PARCIAL' : 'PAGO TOTAL',
          amount: paymentAmount,
          status: 'APROBADO',
        },
        isUserCreating: true,
      },
      'POST'
    )
    dispatch(getClientAppointments(selectedClient._id))
    dispatch(uiLoading())
    closeModal()
  }

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className='modal'
      overlayClassName='modal-fondo'
    >
      <div className='modal-container'>
        <div style={{ width: '100%' }}>
          <div className='service-and-price-modal'>
            <ImageAndName
              name={activeAppointment?.service?.name}
              imageName={activeAppointment?.service?.images[0]}
            />
            <AppointmentPrice price={activeAppointment?.price} />
          </div>

          <div className='user-and-date-container'>
            <ImageAndName
              name={activeAppointment?.artist?.name}
              imageName={activeAppointment?.artist?.avatarName}
              user
            />
            <AppointmentTime start={activeAppointment?.start} />
          </div>
        </div>
      </div>
      <PaymentKinds
        acceptedKinds={paymentKinds}
        selectedKind={paymentKind}
        handleSelect={handleSelectKind}
      />
      <div className='amount-and-button-container'>
        <div className='amount-to-pay'>
          <h5>Monto a abonar</h5>
          <Input
            type='number'
            placeholder='Monto abonado'
            name='paymentAmount'
            value={paymentAmount}
            handleChange={handleChange}
            required
            id='paymentAmount'
          />
        </div>
        <button
          type='submit'
          className='modal-button full-payment-button'
          onClick={handleSubmit}
        >
          <i className='fas fa-money-check-alt mr-2'></i>
          <span>Cargar pago (${paymentAmount})</span>
        </button>
      </div>
    </Modal>
  )
}
