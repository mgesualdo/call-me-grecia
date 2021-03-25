import React from 'react'
import { sub, add, format } from 'date-fns'
import es from 'date-fns/locale/es'
import './datePickerHeader.css'

const DatePickerHeader = ({ dateController }) => {
  const { date, changeYear, changeMonth } = dateController

  let fecha = sub(date, { years: 10 }).toDateString()
  console.log({ fecha, date: new Date(date) })

  const handleYearsDown = (e, unit) => {
    e.preventDefault()
    if (unit === 'years') {
      changeYear(sub(date, { years: 1 }).getFullYear())
    } else {
      changeMonth(sub(date, { months: 1 }).getMonth())
    }
  }
  const handleYearsDownFaster = (e, unit) => {
    e.preventDefault()
    if (unit === 'years') {
      changeYear(sub(date, { years: 10 }).getFullYear())
    } else {
      changeMonth(sub(date, { months: 3 }).getMonth())
    }
  }
  const handleYearsUp = (e, unit) => {
    e.preventDefault()
    if (unit === 'years') {
      changeYear(add(date, { years: 1 }).getFullYear())
    } else {
      changeMonth(add(date, { months: 1 }).getMonth())
    }
  }
  const handleYearsUpFaster = (e, unit) => {
    e.preventDefault()
    if (unit === 'years') {
      changeYear(add(date, { years: 10 }).getFullYear())
    } else {
      changeMonth(add(date, { months: 3 }).getMonth())
    }
  }

  return (
    <div className='date-picker-header-container'>
      <div className='header-container-year-month'>
        <div>
          <button
            onClick={(e) => handleYearsDownFaster(e, 'years')}
            className='btn-date'
          >
            <i className='fas fa-angle-double-left'></i>
          </button>
          <button
            onClick={(e) => handleYearsDown(e, 'years')}
            className='btn-date btn-decrease-date'
          >
            <i className='fas fa-angle-left'></i>
          </button>
        </div>
        {format(date, 'yyyy', { locale: es })}
        <div>
          <button
            onClick={(e) => handleYearsUp(e, 'years')}
            className='btn-date btn-increase-date'
          >
            <i className='fas fa-angle-right'></i>
          </button>
          <button
            onClick={(e) => handleYearsUpFaster(e, 'years')}
            className='btn-date'
          >
            <i className='fas fa-angle-double-right'></i>
          </button>
        </div>
      </div>
      <div className='header-container-year-month'>
        <div>
          <button
            onClick={(e) => handleYearsDownFaster(e, 'months')}
            className='btn-date'
          >
            <i className='fas fa-angle-double-left'></i>
          </button>
          <button
            onClick={(e) => handleYearsDown(e, 'months')}
            className='btn-date btn-decrease-date'
          >
            <i className='fas fa-angle-left'></i>
          </button>
        </div>
        {format(date, 'MMMM', { locale: es })}
        <div>
          <button
            onClick={(e) => handleYearsUp(e, 'months')}
            className='btn-date btn-increase-date'
          >
            <i className='fas fa-angle-right'></i>
          </button>
          <button
            onClick={(e) => handleYearsUpFaster(e, 'months')}
            className='btn-date'
          >
            <i className='fas fa-angle-double-right'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DatePickerHeader
