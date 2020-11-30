import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarAppointment } from './CalendarAppointment'
import { CalendarModal } from './CalendarModal'

import { uiOpenModal } from '../../actions/ui'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import {
  appointmentSetActive,
  clearActiveAppointment,
  appointmentStartLoading,
} from '../../actions/appointment'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteAppointmentFab } from '../ui/DeleteAppointmentFab'

moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {
  const dispatch = useDispatch()
  const { appointments, activeAppointment } = useSelector(
    (state) => state.calendar
  )
  const { loggedClient } = useSelector((state) => state.auth)

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  )

  useEffect(() => {
    dispatch(appointmentStartLoading())
  }, [dispatch])

  const onDoubleClick = (e) => {
    // console.log(e);
    dispatch(uiOpenModal())
  }

  const onSelectAppointment = (e) => {
    dispatch(appointmentSetActive(e))
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (e) => {
    // console.log(e)
    dispatch(clearActiveAppointment())
  }

  const appointmentStyleGetter = (appointment, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }

    return {
      style,
    }
  }

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        appointmentPropGetter={appointmentStyleGetter}
        onDoubleClickAppointment={onDoubleClick}
        onSelectAppointment={onSelectAppointment}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          appointment: CalendarAppointment,
        }}
      />

      <AddNewFab />

      {activeAppointment && <DeleteAppointmentFab />}

      <CalendarModal />
    </div>
  )
}
