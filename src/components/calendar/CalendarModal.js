import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment'
import Modal from 'react-modal'

import { uiCloseModal } from '../../actions/ui'
import { appointmentStartAddNew } from '../../actions/appointment'
import { differenceInMilliseconds } from 'date-fns'

import './calendarModal.css'
import ImageAndName from '../ui/ImageAndName'
import AppointmentPrice from '../clients/AppointmentPrice'
import AppointmentTime from '../clients/AppointmentTime'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'

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

export const CalendarModal = ({ selectedDate, whenWasOpened }) => {
  const { modalOpen, loadingGoingToMercadoPago } = useSelector(
    (state) => state.ui
  )
  const { selectedUser } = useSelector((state) => state.user)
  const { selectedService } = useSelector((state) => state.service)
  const [reservationCost, setReservationCost] = useState(0)
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
    const userService = selectedUser?.services.find(
      (s) => s.service._id === selectedService?._id
    )

    let sena =
      userService?.price * 0.3 <= 300
        ? 300
        : Math.ceil((userService?.price * 0.3) / 100) * 100
    setReservationCost(sena)

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
      hasAttended: true,
      payments: [
        {
          method: 'Mercado Pago',
          kind: 'SEÑA',
          amount: reservationCost,
          status: 'PENDIENTE',
        },
      ],
    }))
  }, [selectedDate, selectedService, selectedUser])

  const closeModal = () => {
    if (differenceInMilliseconds(new Date(), whenWasOpened) < 100) return
    dispatch(uiCloseModal())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    Swal.fire({
      title: 'Importante!',
      html: `<div style="margin-top: 1rem; margin-bottom: 1rem;">
             <span style="display: inline-block; margin-bottom: 1rem">Antes de reservar, queremos que sepas lo siguiente: </span>
        
             <ol style="font-size: 0.9rem; text-align: start; width: 100%; margin: 0; padding-left: 3.2rem">
             <li style="margin-bottom: 0.5rem">Si pasados <b style="color: #38f">30 minutos</b> no se registra tu pago, el turno será anulado automáticamente.</li>
             <li>Dentro de las primeras <b style="color: #38f">5 horas</b> de registrado tu pago, podrás cancelar tu turno y se te devolverá el dinero.</li>
             </ol>
             </div>`,
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Perfecto, quiero reservar!',
    }).then(async (answer) => {
      if (answer.isConfirmed) dispatch(appointmentStartAddNew(formValues))
    })
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
              reservationCost={reservationCost}
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
      <div className='buttons-container'>
        <button
          type='submit'
          className='modal-button full-payment-button'
          onClick={handleSubmit}
        >
          {loadingGoingToMercadoPago ? (
            <Spinner />
          ) : (
            <div>
              <img
                id='mercadoPagoImage'
                src='/img/mp.png'
                style={{
                  width: '2.5rem',
                  marginRight: '1rem',
                }}
                loading='eager'
              />
              <span>Reservar (${formValues?.payments[0]?.amount})</span>
            </div>
          )}
        </button>
      </div>
    </Modal>
  )
}
