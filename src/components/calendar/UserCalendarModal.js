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

export const UserCalendarModal = ({ selectedDate }) => {
  const { modalOpen, loading } = useSelector((state) => state.ui)
  const { activeAppointment } = useSelector((state) => state.user)
  const { loggedUser } = useSelector((state) => state.auth)
  const { selectedClient } = useSelector((state) => state.client)
  const { selectedService } = useSelector((state) => state.service)
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    start: '',
    end: '',
    service: '',
    artist: '',
    price: 0,
    payments: [],
  })

  useEffect(() => {
    if (!!activeAppointment) {
      setFormValues({
        start: activeAppointment.start,
        end: activeAppointment.end,
        service: activeAppointment.service._id,
        artist: activeAppointment.artist._id,
        client: activeAppointment.client._id,
        payments: activeAppointment.payments,
        price: activeAppointment.price,
      })
    } else {
      const userService = loggedUser?.services.find(
        (s) => s.service._id === selectedService?._id
      )

      console.log({ userService })
      setFormValues(() => ({
        start: selectedDate,
        end: moment(selectedDate)
          .add(selectedService?.duration, 'minutes')
          .toDate(),
        service: selectedService?._id,
        artist: loggedUser?._id,
        client: selectedClient?._id,
        price: userService?.price,
        isValid: false,
        hasReserved: false,
        createdByClient: false,
        createdBy: loggedUser?._id,
      }))
    }
  }, [
    activeAppointment,
    selectedDate,
    selectedService,
    selectedClient,
    loggedUser,
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
          <div className='service-img-and-name'>
            <img
              src={`https://appturnos.blob.core.windows.net/servicios/${
                selectedService?.images[0]
              }?${new Date().getTime()}`}
              alt=''
              className='service-modal-img'
            />

            <h4 className='titulo-opcion'>{selectedService?.name}</h4>
          </div>
          <div className='price-container'>
            <span className='price'>${formValues?.price}</span>
            <span className='reservation-cost'>
              Seña ${selectedService?.reservationCost}
            </span>
          </div>
        </div>
      </div>
      <div className='user-and-date-container'>
        <div className='client-img-and-name'>
          {selectedClient?.avatarName ? (
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '13rem',
                overflow: 'hidden',
                marginRight: '1rem',
              }}
            >
              <img
                src={`https://appturnos.blob.core.windows.net/clientes/${selectedClient?.avatarName}`}
                alt='Imagen del cliente'
                style={{
                  width: '3rem',
                  height: '3rem',
                  objectFit: 'contain',
                  backdropFilter: '',
                }}
              />
            </div>
          ) : (
            <i className='fas fa-user no-client-img-icn'></i>
          )}

          <h4>{selectedClient?.name}</h4>
        </div>
        <span className='appointment-date'>
          <i className='fa fa-clock appointment-icn'></i>
          {moment(formValues.start).format('ddd DD/MM HH:mm')}
        </span>
      </div>

      <div className='buttons-container'>
        <button
          type='submit'
          className='modal-button full-payment-button'
          onClick={handleSubmit}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <i className='fas fa-money-check-alt mr-2'></i>
              <span>Reservar turno</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  )
}
