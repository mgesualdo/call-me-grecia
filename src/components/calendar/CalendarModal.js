import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker'

import { uiCloseModal } from '../../actions/ui'
import {
  clearActiveAppointment,
  appointmentStartAddNew,
  appointmentStartUpdate,
} from '../../actions/appointment'
import ServiceList from '../services/ServiceList'
import ArtistList from '../artists/ArtistList'

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
  const { modalOpen } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    start: selectedDate,
    end: moment(selectedDate).add(1, 'hours').toDate(),
    service: '',
    artist: '',
  })
  const { activeAppointment } = useSelector((state) => state.calendar)

  const { artist, service, start } = formValues

  useEffect(() => {
    if (!!activeAppointment) {
      setFormValues({
        ...formValues,
        start: activeAppointment.start,
        end: activeAppointment.end,
        service: activeAppointment.service._id,
        artist: activeAppointment.artist._id,
      })
    } else {
      setFormValues({
        start: selectedDate,
        end: moment(selectedDate).add(1, 'hours').toDate(),
        service: '',
        artist: '',
      })
    }
  }, [activeAppointment, setFormValues])

  useEffect(() => {
    setFormValues({
      start: selectedDate,
      end: moment(selectedDate).add(1, 'hours').toDate(),
      service: '',
      artist: '',
    })
  }, [selectedDate])

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch(uiCloseModal())
    dispatch(clearActiveAppointment())
  }

  const handleStartDateChange = (e) => {
    setFormValues({
      ...formValues,
      start: e,
      end: moment(e).add(4, 'hours').toDate(),
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    if (activeAppointment) {
      dispatch(appointmentStartUpdate(formValues, activeAppointment._id))
    } else {
      dispatch(appointmentStartAddNew(formValues))
    }
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
      <h1 className='text-center'>
        {' '}
        {activeAppointment ? 'Editar turno' : 'Nuevo turno'}{' '}
      </h1>
      <hr />
      <form className='container' onSubmit={handleSubmitForm}>
        <div className='form-group'>
          <label>Fecha y hora de inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={start}
            disabled
            className='form-control form-control-lg'
          />
          <label className='mt-4'>Artista</label>
          <ArtistList
            handleInputChange={handleInputChange}
            artistValue={artist}
          />
        </div>
        <div className='form-group'>
          <div className='form-group'>
            <label>Servicio</label>

            <ServiceList
              serviceValue={service}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>

        <button type='submit' className='btn btn-primary btn-block mt-4 btn-lg'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
