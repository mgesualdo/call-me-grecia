import React from 'react'
import { years } from '../../../utils/constants'
import './DaysDropDown.css'

const DaysDropDown = ({
  active,
  setDaysActive,
  setMonthsActive,
  setYearsActive,
  selectedYear,
  setSelectedYear,
}) => {
  const handleClick = () => {
    if (!active) {
      setYearsActive(true)
      setDaysActive(false)
      setMonthsActive(false)
    } else {
      setYearsActive(false)
    }
  }

  const handleOptionClick = (e, y) => {
    setSelectedYear(y)
    const opcionSeleccionada = document.getElementById(y).innerHTML
    const contenidoSelect = document.getElementById('contenido-select-year')

    if (y === selectedYear) {
      contenidoSelect.firstChild.innerHTML = `<h4 id='titulo-year'> Año </h4>`
    } else {
      contenidoSelect.firstChild.innerHTML = opcionSeleccionada
    }

    if (!active) {
      setYearsActive(true)
      setDaysActive(false)
      setMonthsActive(false)
    } else {
      setYearsActive(false)
    }
  }

  return (
    <div className={`contenedor-days ${active ? 'active' : ''}`}>
      <div className='selectbox-days'>
        <div
          className={`day-select ${active ? 'active' : ''}`}
          id='select-year'
          onClick={handleClick}
        >
          <div
            className={`contenido-day-select ${
              selectedYear ? 'something-selected' : ''
            }`}
            id='contenido-select-year'
          >
            <div>
              <h4 id='titulo-year' className={`titulo`}>
                Año
              </h4>
            </div>
          </div>
          <i className='fas fa-angle-down' aria-hidden='true'></i>
        </div>
        <div
          className={`days-to-select years ${active ? 'active' : ''} ${
            active && selectedYear ? 'something-selected' : ''
          }`}
        >
          {years.map((y) => (
            <div
              key={y}
              id={y}
              className={`opcion ${
                y === selectedYear ? 'opcion-selected' : ''
              }`}
              onClick={(e) => handleOptionClick(e, y)}
            >
              <h4 className='titulo-opcion-day'>{y}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(DaysDropDown)
