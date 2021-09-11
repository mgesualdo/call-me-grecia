import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, setSelectedService } from '../../../actions/services'
import { setSelectedUser } from '../../../actions/users'
import './searchableDropDown.css'

const SearchableDropDownServices = ({ smaller = false, userServices }) => {
  const [active, setActive] = useState(false)
  const [textToSearch, setTextToSearch] = useState('')
  const [servicesToShow, setServicesToShow] = useState([])

  const { services, selectedService } = useSelector((state) => state.service)
  const { loggedUser } = useSelector((state) => state.auth)
  const { selectedUser } = useSelector((state) => state.user)

  useEffect(() => {
    if (!!selectedUser && loggedUser) {
      setServicesToShow(userServices)
    } else {
      let filteredServices = services.filter((s) => s?.usersCount > 0)
      setServicesToShow(filteredServices)
    }
  }, [selectedUser])

  useEffect(() => {
    let filteredServices = services.filter((s) => s?.usersCount > 0)
    setServicesToShow(filteredServices)
  }, [services])

  const dispatch = useDispatch()

  const handleClick = () => {
    const buscador = document.getElementById('buscar-servicio')
    const titulo = document.getElementById('titulo-service')
    setActive(!active)
    if (titulo) {
      titulo.className = `titulo ${!active ? 'no-mostrar' : ''}`
    }
    buscador.focus()
  }

  const handleInputChange = (e) => {
    setTextToSearch(e.target.value)
    dispatch(getServices(e.target.value))
  }

  const handleOptionClick = (e, id) => {
    dispatch(setSelectedUser({}))
    const opcionSeleccionada = document.getElementById(id).innerHTML
    const contenidoSelect = document.getElementById('contenido-select-service')

    if (id === selectedService?._id) {
      contenidoSelect.firstChild.innerHTML = `<h4
        id='titulo-service'

      >
        Elegí un servicio
      </h4>`
      dispatch(setSelectedService(null))
    } else {
      dispatch(setSelectedService(id))

      contenidoSelect.firstChild.innerHTML = opcionSeleccionada
    }

    setActive(!active)
  }

  return (
    <div className={`contenedor ${smaller && 'smaller-dropdown'}`}>
      <form action=''>
        <div className='selectbox'>
          <div
            className={`select ${active ? 'active' : ''}`}
            id='select'
            onClick={handleClick}
          >
            <div
              className={`contenido-select ${
                selectedService ? 'something-selected' : ''
              }`}
              id='contenido-select-service'
            >
              <div
                className={`first-child-contenido-select ${
                  active && selectedService ? 'active' : ''
                }`}
              >
                <h4
                  id='titulo-service'
                  className={`titulo ${active ? 'no-mostrar' : ''}`}
                >
                  {active ? '' : 'Elegí un servicio'}
                </h4>
              </div>
              <input
                className={`buscar-servicio ${active ? '' : 'no-mostrar'} ${
                  active && selectedService ? 'mb-3' : ''
                }`}
                type='text'
                placeholder='Buscar'
                value={textToSearch}
                id='buscar-servicio'
                autoComplete='off'
                onChange={handleInputChange}
              />
            </div>
            <i className='fas fa-angle-down' aria-hidden='true'></i>
          </div>
          <div
            className={`opciones ${active ? 'active' : ''} ${
              active && selectedService ? 'something-selected' : ''
            }`}
          >
            {servicesToShow.map((s) => (
              <div
                key={s._id}
                id={s._id}
                className={`opcion ${
                  s._id === selectedService?._id ? 'opcion-selected' : ''
                } option-container`}
                onClick={(e) => handleOptionClick(e, s._id)}
              >
                <div className='option-image-and-name'>
                  <img
                    src={`https://appturnos.blob.core.windows.net/servicios/${
                      s.images[0]
                    }?${new Date().getTime()}`}
                    alt=''
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      marginRight: '1rem',
                      marginLeft: '1rem',
                      borderRadius: '2.5rem',
                      objectFit: 'contain',
                    }}
                  />

                  <h4 className='titulo-opcion'>{s.name}</h4>
                </div>

                <span className='appointment-date'>
                  {s.duration} <small> min</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}

export default React.memo(SearchableDropDownServices)
