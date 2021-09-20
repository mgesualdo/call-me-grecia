import React, { useEffect, useState } from 'react'
import DaysDropDown from './DaysDropDown'
import MonthsDropDown from './MonthsDropDown'
import YearsDropDown from './YearsDropDown'
import { months } from '../../../utils/constants'
import { addHours } from 'date-fns/esm'

const BirthdayPicker = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  setSelectedDay,
  setSelectedMonth,
  setSelectedYear,
  birthday,
}) => {
  const [daysActive, setDaysActive] = useState(false)
  const [monthsActive, setMonthsActive] = useState(false)
  const [yearsActive, setYearsActive] = useState(false)

  useEffect(() => {
    if (birthday) {
      const contenidoSelectDay = document.getElementById('contenido-select-day')
      const day = new Date(birthday).getDate() + 1
      const birthdayDay = document.getElementById(day).innerHTML
      contenidoSelectDay.firstChild.innerHTML = birthdayDay
      const contenidoSelectMonth = document.getElementById(
        'contenido-select-month'
      )
      const monthId = new Date(birthday).getMonth()
      const month = months[monthId]
      console.log({ monthName: month.name, monthId })
      const birthdayMonth = document.getElementById(month.number)?.innerHTML
      contenidoSelectMonth.firstChild.innerHTML = month.name
      const contenidoSelectYear = document.getElementById(
        'contenido-select-year'
      )
      const year = new Date(birthday).getFullYear()
      const birthdayYear = document.getElementById(year)?.innerHTML
      contenidoSelectYear.firstChild.innerHTML = birthdayYear

      setSelectedDay(day)
      setSelectedMonth(month.name)
      setSelectedYear(year)
    } else {
      setSelectedDay(null)
      setSelectedMonth(null)
      setSelectedYear(null)
    }
  }, [])

  return (
    <>
      <label
        style={{
          display: 'block',
          color: 'black',
          marginLeft: '0.3rem',
        }}
      >
        <i className='far fa-calendar-alt icn-calendar-birthay'></i>
        Fecha de nacimiento
      </label>
      <div className='custom-date-picker-container'>
        <DaysDropDown
          active={daysActive}
          setDaysActive={setDaysActive}
          setMonthsActive={setMonthsActive}
          setYearsActive={setYearsActive}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <MonthsDropDown
          active={monthsActive}
          setDaysActive={setDaysActive}
          setMonthsActive={setMonthsActive}
          setYearsActive={setYearsActive}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <YearsDropDown
          active={yearsActive}
          setDaysActive={setDaysActive}
          setMonthsActive={setMonthsActive}
          setYearsActive={setYearsActive}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
    </>
  )
}

export default BirthdayPicker
