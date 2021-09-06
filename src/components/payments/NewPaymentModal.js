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
import Spinner from '../ui/Spinner'
import { getUserAppointments } from '../../actions/users'
import { useHistory } from 'react-router'

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
  const { newPaymentModalOpen, loading } = useSelector((state) => state.ui)
  const { activeAppointment } = useSelector((state) => state.user)
  const { selectedClient } = useSelector((state) => state.client)
  const [creatingPayment, setCreatingPayment] = useState(false)

  const history = useHistory()

  const balance = calculateBalance(
    activeAppointment?.price,
    activeAppointment?.payments ?? []
  )

  const dispatch = useDispatch()

  const [paymentAmount, setPaymentAmout] = useState()
  const [paymentKind, setPaymentKind] = useState('Efectivo')

  const handleChange = (e) => setPaymentAmout(e.target.value)
  const handleSelectKind = (kind) => setPaymentKind(kind)

  useEffect(() => {
    setPaymentAmout(balance)
  }, [balance])

  const closeModal = () => {
    dispatch(uiCloseModal())
    dispatch(clearActiveAppointment())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCreatingPayment(true)
    dispatch(uiLoading(true))
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
    dispatch(uiLoading(false))
    !!selectedClient && dispatch(getClientAppointments(selectedClient._id))
    dispatch(getUserAppointments(activeAppointment.artist._id))
    closeModal()
  }

  const handleDidntAsist = () => {
    setCreatingPayment(false)
    dispatch(uiLoading(true))
    fetchSinToken(
      `appointment/client-has-not-attended/${activeAppointment._id}`,
      {},
      'PUT'
    )
      .then((res) => {
        return res.json()
      })
      .then((body) => {
        if (body.ok) {
          dispatch(uiLoading(false))
          dispatch(getUserAppointments(activeAppointment.artist._id))
          closeModal()
        }
      })
  }

  const handleChangeDate = () => {
    history.push(`/users/appointments/change-date`)
    dispatch(uiCloseModal())
  }

  return (
    <Modal
      isOpen={newPaymentModalOpen}
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
          <h5 style={{ fontWeight: 'bolder', marginBottom: '0 !important' }}>
            Monto a abonar
          </h5>
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
          className='modal-button full-payment-button mt-3 adjust-padding'
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading && creatingPayment ? (
            <Spinner width='0.1rem' height='0.1rem' />
          ) : (
            <>
              <i className='fas fa-money-check-alt mr-2'></i>
              <span>Cargar pago (${paymentAmount})</span>
            </>
          )}
        </button>
      </div>
      <div className='buttons-container-modal'>
        <button
          className='modal-btn change-date'
          onClick={handleChangeDate}
          disabled={loading}
        >
          {loading && !creatingPayment ? (
            <Spinner width='0.1rem' height='0.1rem' />
          ) : (
            <span>Editar turno</span>
          )}
        </button>
        <button
          className='modal-btn hasnt-aattended'
          onClick={handleDidntAsist}
          disabled={loading}
        >
          {loading && !creatingPayment ? (
            <Spinner width='0.1rem' height='0.1rem' />
          ) : (
            <span>No asistió</span>
          )}
        </button>
      </div>
    </Modal>
  )
}
