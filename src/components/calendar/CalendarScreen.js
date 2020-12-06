import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as dates from '../../utils/dates'

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
  const [selectedDate, setSelectedDate] = useState(moment().toDate())
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  )

  useEffect(() => {
    dispatch(appointmentStartLoading())
  }, [dispatch])

  const onDoubleClick = (appointment) => {
    // console.log(e);
    appointment.client === loggedClient._id && dispatch(uiOpenModal())
  }

  const onSelectAppointment = (appointment) => {
    appointment.client === loggedClient._id &&
      dispatch(appointmentSetActive(appointment))
  }

  const onViewChange = (e) => {
    console.log(e)
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (slot) => {
    setSelectedDate(slot.start)
    if (lastView === 'month') {
      console.log(slot)
      setLastView('week')
    } else {
      dispatch(uiOpenModal())
      dispatch(clearActiveAppointment())
    }
  }

  const onNavigate = (date, view, direction) => {
    console.log(view, date)
    if (view === 'month' && direction === 'NEXT') {
      setSelectedDate(moment(date).toDate())
    } else if (view === 'month' && direction === 'PREV') {
      setSelectedDate(moment(date).toDate())
    } else if (view === 'week' && direction === 'NEXT') {
      setSelectedDate(moment(date).toDate())
    } else if (view === 'week' && direction === 'PREV') {
      setSelectedDate(moment(date).toDate())
    } else if (view === 'day' && direction === 'NEXT') {
      setSelectedDate(moment(date).toDate())
    } else if (view === 'day' && direction === 'PREV') {
      setSelectedDate(moment(date).toDate())
    }
  }

  const appointmentStyleGetter = (appointment, start, end, isSelected) => {
    const style = {
      backgroundColor:
        appointment.client === loggedClient._id ? '#367CF7' : '#CC3333',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }

    return {
      style,
    }
  }

  const slotStyleGetter = (slot, start, end, isSelected) => {
    const style = {
      cursor: 'pointer',
      width: '100%',
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
        views={['month', 'week', 'day']}
        startAccessor='start'
        endAccessor='end'
        slotPropGetter={slotStyleGetter}
        messages={messages}
        eventPropGetter={appointmentStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectAppointment}
        onView={onViewChange}
        min={dates.add(
          dates.startOf(new Date(2020, 17, 12), 'day'),
          10,
          'hours'
        )}
        max={dates.add(dates.endOf(new Date(2020, 17, 12), 'day'), -4, 'hours')}
        onSelectSlot={onSelectSlot}
        selectable={true}
        date={selectedDate}
        onNavigate={onNavigate}
        view={lastView}
        components={{
          event: CalendarAppointment,
        }}
      />

      <AddNewFab />

      {activeAppointment && <DeleteAppointmentFab />}

      <CalendarModal selectedDate={selectedDate} />
    </div>
  )
}
