import React, { useEffect } from 'react'

import Swal from 'sweetalert2'
import { MyCalendar } from '../calendar/MyCalendar'

import { Navbar } from '../ui/Navbar'
import SearchableDropDownServices from '../ui/DropDowns/SearchableDropDownServices'

import UsersToChoose from '../users/UsersToChoose'

import './homeScreen.css'
import { useSelector } from 'react-redux'
import ServiceInfo from '../services/ServiceInfo'
import { useHistory } from 'react-router'
// import { useLayoutEffect } from 'react'

const HomeScreen = () => {
  const { selectedService } = useSelector((state) => state.service)
  const { loggedUser } = useSelector((state) => state.auth)

  const history = useHistory()

  useEffect(() => {
    if (loggedUser) {
      history.push('/users/calendario')
    }
    const queryParameters = window.location.search.toString()

    if (queryParameters) {
      const newStatus = queryParameters
        .split('status')[1]
        .split('&')[0]
        .replace('=', '')

      if (newStatus === 'approved') {
        Swal.fire('Perfecto!', 'Tu turno fue reservado con éxtio!', 'success')
      } else if (newStatus === 'pending') {
        Swal.fire(
          'Todavía falta!',
          'Tu pago está en estado PENDIENTE, revisá en unas horas!',
          'warning'
        ).then(() => {
          return
        })
      } else {
        Swal.fire(
          'Error!',
          'Hubo un problema con tu pago, no te pudimos reservar el turno!',
          'error'
        )
      }
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='container-seleccion-turnos'>
        <div
          style={{
            width: '90vw',
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 0 12px 5px rgba(0,0,0,0.1)',
            padding: '1rem',
          }}
        >
          <h1 style={{ textAlign: 'center' }}>¡Hola!</h1>
          <h1 style={{ textAlign: 'center' }}>
            Cambiamos de web de turnos para que te sea mucho más fácil y rápido.
          </h1>
          <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>
            <b>Haz click en el siguiente enlace </b>
          </h2>
          <h1> &#128071;&#128071;</h1>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() =>
              window.open(`https://tuturno.io/turnos/greciastudio`)
            }
          >
            <h1 className='tuturno'>
              <b style={{ color: 'blue', textDecoration: 'underline' }}>
                www.tuturno.io{' '}
              </b>
            </h1>{' '}
            <h1 style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>
              {' '}
              &#128640;
            </h1>
          </div>

          <h3 style={{ marginTop: '1rem' }}>Nos vemos por allá!</h3>
          <h1 style={{ margin: '0.5rem' }}>&#129498;</h1>
        </div>
        {false && (
          <>
            <div className='servicios-usuarios'>
              <SearchableDropDownServices />
              {selectedService && <ServiceInfo service={selectedService} />}
              <UsersToChoose />
            </div>
            <div id='calendario'>
              <MyCalendar />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default HomeScreen
