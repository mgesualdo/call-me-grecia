import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment'
import Modal from 'react-modal'

import { uiCloseModal } from '../../actions/ui'
import { appointmentStartUpdate } from '../../actions/appointment'

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

export const EditAppointmentModal = ({ selectedDate }) => {
  const { changeDateModalOpen, loading } = useSelector((state) => state.ui)
  const { activeAppointment } = useSelector((state) => state.user)
  const { loggedUser } = useSelector((state) => state.auth)
  const { selectedService } = useSelector((state) => state.service)
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({})
  const [userService, setUserService] = useState(selectedService ?? {})
  const [startDateToUse, setStartDateToUse] = useState(activeAppointment?.start)
  const [endDateToUse, setEndDateToUse] = useState(activeAppointment?.end)

  useEffect(() => {
    setUserService(
      loggedUser?.services.find((s) => s.service._id === selectedService?._id)
    )
  }, [selectedService])

  useEffect(() => {
    if (!!selectedDate) {
      setStartDateToUse(selectedDate)
      setEndDateToUse(
        moment(selectedDate)
          .add(Math.ceil(selectedService?.duration / 60) * 60, 'minutes')
          .toDate()
      )
    } else {
      setStartDateToUse(activeAppointment?.start)
      setEndDateToUse(activeAppointment?.end)
    }
  }, [selectedDate])

  useEffect(() => {
    setFormValues({
      start: startDateToUse,
      end: endDateToUse,
      service: selectedService?._id,
      artist: activeAppointment?.artist._id,
      client: activeAppointment?.client._id,
      payments: activeAppointment?.payments,
      price: userService?.price,
      isValid: activeAppointment?.isValid,
      cancelled: activeAppointment?.cancelled,
      hasReserved: activeAppointment?.hasReserved,
      createdByClient: activeAppointment?.createdByClient,
      hasAttended: activeAppointment?.hasAttended,
    })
  }, [startDateToUse, selectedService])

  const closeModal = () => {
    dispatch(uiCloseModal())
    // dispatch(clearActiveAppointment())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('LA CONCHA DE TU MADRE!!!')
    dispatch(appointmentStartUpdate(formValues, activeAppointment._id, true))
  }

  return (
    <Modal
      isOpen={changeDateModalOpen}
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
          {activeAppointment?.client?.avatarName ? (
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
                src={`https://appturnos.blob.core.windows.net/clientes/${activeAppointment.client?.avatarName}`}
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

          <h4>{activeAppointment?.client?.name}</h4>
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
              <span>Actualizar turno</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  )
}
