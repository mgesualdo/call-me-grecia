import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker'
import { addHours } from 'date-fns'
import Input from '../ui/Input'
import SubmitButton from '../ui/SubmitButton'
import Swal from 'sweetalert2'
import { uiLoading } from '../../actions/ui'
import es from 'date-fns/locale/es'

import 'react-datepicker/dist/react-datepicker.css'
import './NoveltiesForm.css'
import { startRefreshLoggedUser } from '../../actions/auth'

registerLocale('es', es)

const baseUrl = process.env.REACT_APP_API_URL

const NoveltiesForm = ({
  noveltyId,
  noveltyStart,
  noveltyEnd,
  noveltyComments,
  setNoveltyStart,
  setNoveltyEnd,
  setNoveltyComments,
  addingNovelty,
}) => {
  const { loggedUser } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const { loading } = useSelector((state) => state.ui)

  const handleStart = (date) => setNoveltyStart(date)
  const handleEnd = (date) => setNoveltyEnd(date)
  const handleComments = ({ target }) => setNoveltyComments(target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    const url = `${baseUrl}/user/novelties/${loggedUser._id}`

    dispatch(uiLoading(true))
    fetch(url, {
      method: addingNovelty ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: loggedUser._id,
        noveltyInfo: {
          id: addingNovelty ? '' : noveltyId,
          start: noveltyStart,
          end: noveltyEnd,
          comments: noveltyComments,
        },
      }),
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.ok) {
          Swal.fire('Listo!', response.message, 'success')
        } else {
          console.log(response)
          Swal.fire('Error', response.message, 'warning')
        }
        dispatch(startRefreshLoggedUser(loggedUser._id))
        dispatch(uiLoading(false))
      })
      .catch((e) => {
        Swal.fire(
          'Error del servidor',
          'Contacte al administrador de la aplicación',
          'error'
        )
      })
  }

  return (
    <form onSubmit={handleSubmit} className='novelties-form'>
      <h2 className='text-center mb-4'>
        {addingNovelty ? 'Agregando novedad' : 'Editando novedad'}
      </h2>
      <div className=''>
        <div className='icn-date-picker-container'>
          <i className='far fa-calendar-alt input-icn'></i>
          <DatePicker
            selected={noveltyStart}
            onChange={handleStart}
            minDate={new Date()}
            locale='es'
            dateFormat='Pp'
            inputMode='none'
            name='noveltyStart'
            placeholderText='Desde'
            autoComplete='off'
            isClearable
            showTimeSelect
            className='date-picker-novelty'
          />
        </div>
        <div className='icn-date-picker-container'>
          <i className='far fa-calendar-alt input-icn'></i>
          <DatePicker
            selected={noveltyEnd}
            onChange={handleEnd}
            minDate={addHours(noveltyStart, 1)}
            locale='es'
            placeholderText='Hasta'
            autoComplete='off'
            dateFormat='Pp'
            name='noveltyEnd'
            isClearable
            showTimeSelect
            className='date-picker-novelty'
          />
        </div>
      </div>

      <Input
        type='text-area'
        placeholder='Comentarios adicionales'
        name='noveltyComments'
        value={noveltyComments}
        handleChange={handleComments}
      />
      <SubmitButton
        adding={addingNovelty}
        loading={loading}
        addingText='Agregar novedad'
        editingText='Actualizar novedad'
      />
    </form>
  )
}

export default NoveltiesForm
