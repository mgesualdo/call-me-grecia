import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment'
import Modal from 'react-modal'

import { uiCloseModal } from '../../actions/ui'
import {
  clearActiveAppointment,
  appointmentStartAddNew,
  appointmentStartUpdate,
} from '../../actions/appointment'

import './calendarModal.css'
import PaymentTypesOptions from '../payments/PaymentTypesDropDown'
import ImageAndName from '../ui/ImageAndName'
import AppointmentPrice from '../clients/AppointmentPrice'
import AppointmentTime from '../clients/AppointmentTime'
import Spinner from '../ui/Spinner'

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

export const CalendarModal = ({ selectedDate }) => {
  const { modalOpen, loadingGoingToMercadoPago } = useSelector(
    (state) => state.ui
  )
  const { selectedUser, activeAppointment } = useSelector((state) => state.user)
  const { selectedService } = useSelector((state) => state.service)
  const dispatch = useDispatch()

  const [paymentType, setPaymentType] = useState('SEÑA')
  const [formValues, setFormValues] = useState({
    start: '',
    end: '',
    service: '',
    artist: '',
    price: 0,
    payments: [],
  })

  useEffect(() => {
    const userService = selectedUser?.services.find(
      (s) => s.service._id === selectedService?._id
    )
    setFormValues(() => ({
      start: selectedDate,
      end: moment(selectedDate)
        .add(Math.ceil(selectedService?.duration / 60) * 60, 'minutes')
        .toDate(),
      service: selectedService?._id,
      artist: selectedUser?._id,
      price: userService?.price,
      isValid: true,
      cancelled: false,
      hasReserved: false,
      createdByClient: true,
      payments: [
        {
          method: 'Mercado Pago',
          kind: paymentType,
          amount:
            paymentType === 'SEÑA'
              ? selectedService?.reservationCost
              : userService?.price,
          status: 'PENDIENTE',
        },
      ],
    }))
  }, [
    activeAppointment,
    selectedDate,
    paymentType,
    selectedService,
    selectedUser,
  ])

  const closeModal = () => {
    dispatch(uiCloseModal())
    dispatch(clearActiveAppointment())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (activeAppointment) {
      dispatch(appointmentStartUpdate(formValues, activeAppointment._id))
    } else {
      console.log(formValues)
      dispatch(appointmentStartAddNew(formValues))
    }
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
      <div
        key={selectedService?._id}
        id={selectedService?._id}
        className='modal-container'
      >
        <div className='service-and-price-modal'>
          <div className='service-and-price-modal'>
            <ImageAndName
              name={selectedService?.name}
              imageName={selectedService?.images[0]}
            />
            <AppointmentPrice
              price={formValues.price}
              reservationCost={selectedService?.reservationCost}
            />
          </div>
        </div>
      </div>
      <div className='user-and-date-container'>
        <ImageAndName
          name={selectedUser?.name}
          imageName={selectedUser?.avatarName}
          user
        />
        <AppointmentTime start={formValues.start} />
      </div>
      <PaymentTypesOptions
        setPaymentType={setPaymentType}
        paymentType={paymentType}
      />
      <div className='buttons-container'>
        <button
          type='submit'
          className='modal-button full-payment-button'
          onClick={handleSubmit}
        >
          {loadingGoingToMercadoPago ? (
            <Spinner />
          ) : (
            <>
              <i className='fas fa-money-check-alt mr-2'></i>
              <span>Reservar (${formValues?.payments[0]?.amount})</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  )
}
