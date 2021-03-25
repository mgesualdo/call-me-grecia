import React from 'react'
import { daysOfMonth } from '../../../utils/constants'
import './DaysDropDown.css'

const DaysDropDown = ({
  active,
  setDaysActive,
  setMonthsActive,
  setYearsActive,
  selectedDay,
  setSelectedDay,
}) => {
  const handleClick = () => {
    if (!active) {
      setDaysActive(true)
      setMonthsActive(false)
      setYearsActive(false)
    } else {
      setDaysActive(false)
    }
  }

  const handleOptionClick = (e, d) => {
    setSelectedDay(d)
    const opcionSeleccionada = document.getElementById(d).innerHTML
    const contenidoSelect = document.getElementById('contenido-select-day')

    if (d === selectedDay) {
      contenidoSelect.firstChild.innerHTML = `<h4 id='titulo-day'> Día </h4>`
    } else {
      contenidoSelect.firstChild.innerHTML = opcionSeleccionada
    }

    if (!active) {
      setDaysActive(true)
      setMonthsActive(false)
      setYearsActive(false)
    } else {
      setDaysActive(false)
    }
  }

  return (
    <div className={`contenedor-days ${active ? 'active' : ''}`}>
      <div className='selectbox-days'>
        <div
          className={`day-select ${active ? 'active' : ''}`}
          id='select-day'
          onClick={handleClick}
        >
          <div
            className={`contenido-day-select ${
              selectedDay ? 'something-selected' : ''
            }`}
            id='contenido-select-day'
          >
            <div>
              <h4 id='titulo-day' className={`titulo`}>
                Día
              </h4>
            </div>
          </div>
          <i className='fas fa-angle-down' aria-hidden='true'></i>
        </div>
        <div
          className={`days-to-select ${active ? 'active' : ''} ${
            active && selectedDay ? 'something-selected' : ''
          }`}
        >
          {daysOfMonth.map((d) => (
            <div
              key={d}
              id={d}
              className={`opcion ${d === selectedDay ? 'opcion-selected' : ''}`}
              onClick={(e) => handleOptionClick(e, d)}
            >
              <h4 className='titulo-opcion-day'>{d}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(DaysDropDown)
