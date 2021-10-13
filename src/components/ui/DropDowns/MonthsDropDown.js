import React from 'react'
import { months } from '../../../utils/constants'
import './DaysDropDown.css'

const DaysDropDown = ({
  active,
  setDaysActive,
  setMonthsActive,
  setYearsActive,
  selectedMonth,
  setSelectedMonth,
}) => {
  const handleClick = () => {
    if (!active) {
      setMonthsActive(true)
      setDaysActive(false)
      setYearsActive(false)
    } else {
      setMonthsActive(false)
    }
  }

  const handleOptionClick = (e, m) => {
    setSelectedMonth(m.number)

    const opcionSeleccionada = document.getElementById(m.number).innerHTML

    const contenidoSelect = document.getElementById('contenido-select-month')

    if (m === selectedMonth) {
      contenidoSelect.firstChild.innerHTML = `<h4 id='titulo-month'> Mes </h4>`
    } else {
      contenidoSelect.firstChild.innerHTML = `<h4 className='titulo-opcion-day'>${m.name}</h4>`
    }
    if (!active) {
      setMonthsActive(true)
      setDaysActive(false)
      setYearsActive(false)
    } else {
      setMonthsActive(false)
    }
  }

  return (
    <div className={`contenedor-days bigger ${active ? 'active' : ''}`}>
      <div className='selectbox-days'>
        <div
          className={`day-select ${active ? 'active' : ''}`}
          id='select-month'
          onClick={handleClick}
        >
          <div
            className={`contenido-day-select ${
              selectedMonth ? 'something-selected' : ''
            }`}
            id='contenido-select-month'
          >
            <div>
              <h4 id='titulo-month' className={`titulo`}>
                Mes
              </h4>
            </div>
          </div>
          <i className='fas fa-angle-down' aria-hidden='true'></i>
        </div>
        <div
          className={`days-to-select months ${active ? 'active' : ''} ${
            active && selectedMonth ? 'something-selected' : ''
          }`}
        >
          {months.map((m) => (
            <div
              key={m.numer}
              id={m.number}
              className={`opcion ${
                m.number === selectedMonth ? 'opcion-selected' : ''
              }`}
              onClick={(e) => handleOptionClick(e, m)}
            >
              <h4 className='titulo-opcion-day'>{m.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(DaysDropDown)
