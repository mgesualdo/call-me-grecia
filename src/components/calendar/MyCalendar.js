import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { differenceInMinutes, parseISO } from 'date-fns'
import * as dates from '../../utils/dates'

import { messages } from '../../helpers/calendar-messages-es'
import { CalendarAppointment } from './CalendarAppointment'
import { CalendarModal } from './CalendarModal'

import { uiOpenModal } from '../../actions/ui'

import { availableHours } from '../../utils/constants'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { clearActiveAppointment } from '../../actions/appointment'
import determineAvailability from '../../helpers/determineAvailability'
import { CalendarDay } from './CalendarDay'

moment.locale('es')

const localizer = momentLocalizer(moment)
let mobile = false
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  mobile = true
}

export const MyCalendar = () => {
  const dispatch = useDispatch()
  const { activeAppointment, userAppointments, selectedUser } = useSelector(
    (state) => state.user
  )
  const { selectedService } = useSelector((state) => state.service)
  const { loggedClient } = useSelector((state) => state.auth)
  const [selectedDate, setSelectedDate] = useState(moment().toDate())
  const [firstTimeInDayView, setFirstTimeInDayView] = useState(0)
  const [lastView, setLastView] = useState('month')

  const userAppointmentsWithReservation = userAppointments.filter(
    (a) => a.hasReserved || a.isValid
  )

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (slot) => {
    console.log(slot)
    const [
      isClosed,
      isUserAvailable,
      availableAppointments,
      isPossibleToReservate,
    ] = determineAvailability(
      slot.start,
      selectedUser,
      lastView,
      userAppointmentsWithReservation,
      selectedService
    )

    console.log({ isClosed, availableAppointments, lastView })

    if ((isClosed || availableAppointments === 0) && lastView === 'month') {
      dispatch(clearActiveAppointment())
      return
    }

    if (lastView === 'month' && !isClosed && availableAppointments > 0) {
      setSelectedDate(slot.slots[0])
      setLastView('day')
      mobile && setFirstTimeInDayView(1)
      localStorage.setItem('lastView', 'day')
      return
    } else {
      if (
        (isClosed ||
          !isUserAvailable ||
          !isPossibleToReservate ||
          firstTimeInDayView === 1) &&
        lastView !== 'month'
      ) {
        setFirstTimeInDayView((prev) => prev + 1)
        return null
      } else {
        setSelectedDate(slot.start)
        dispatch(uiOpenModal())
        setFirstTimeInDayView((prev) => prev + 1)
      }
    }
  }

  const onNavigate = (date) => setSelectedDate(moment(date).toDate())

  const appointmentStyleGetter = (appointment, start, end) => {
    let backgroundColor = '#CC3333'
    let color = 'white'
    let selected = !!activeAppointment
      ? activeAppointment._id === appointment._id
      : false
    let hasReserved = appointment.hasReserved

    let reservationTimeExpired =
      differenceInMinutes(parseISO(appointment.createdAt), new Date()) > 30

    if (appointment?.client?._id === loggedClient?._id) {
      backgroundColor =
        !hasReserved && !reservationTimeExpired ? '#ffbb00' : '#367CF7'
      color = !hasReserved && !reservationTimeExpired ? '#333' : 'white'
    }

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: color,
      border: selected && `3px solid black`,
    }

    return {
      style,
      className: lastView === 'month' && 'day-view-event',
    }
  }

  const slotStyleGetter = (date) => {
    const [
      isClosed,
      isUserAvailable,
      ,
      isPossibleToReservate,
    ] = determineAvailability(
      date,
      selectedUser,
      lastView,
      userAppointmentsWithReservation,
      selectedService
    )

    const style = {
      background:
        isClosed || !isUserAvailable || !isPossibleToReservate
          ? '#ddd'
          : 'white',
      cursor: (!isClosed || isUserAvailable) && 'pointer',
      border: isClosed && '0px solid #ddd',
      width: '100%',
      userSelect: 'none !important',
    }

    return {
      style,
    }
  }

  const dayStyleGetter = (date) => {
    const [
      isClosed,
      isUserAvailable,
      availableAppointments,
    ] = determineAvailability(
      date,
      selectedUser,
      lastView,
      userAppointmentsWithReservation
    )

    let backgroundColor = ''
    if (isClosed) {
      backgroundColor = '#dddddd88'
    } else if (availableAppointments <= 0 && !isClosed) {
      backgroundColor = '#dd000033'
    } else if (
      availableAppointments > 0 &&
      availableAppointments <= 3 &&
      !isClosed
    ) {
      backgroundColor = 'rgba(255,201,51,0.2)'
    } else if (availableAppointments > 3 && !isClosed) {
      backgroundColor = '#33ff8122'
    } else if (availableAppointments <= 0 && !isClosed) {
      backgroundColor = '#dd000022'
    } else {
      backgroundColor = 'white'
    }

    const style = {
      background: backgroundColor,
      cursor:
        (!isClosed || isUserAvailable) &&
        availableAppointments > 0 &&
        'pointer',
      border: isClosed && '1px solid #eee',
      width: '100%',
    }

    return {
      style,
    }
  }

  return (
    <div className='calendar-screen'>
      {!!selectedUser && !!loggedClient && (
        <>
          <div className='reference-container'>
            <div className='reference'>
              <span>#</span>
            </div>
            <h4 className='ml-2'>Turnos disponibles</h4>
          </div>
          <Calendar
            localizer={localizer}
            events={userAppointmentsWithReservation}
            views={['month', 'day']}
            startAccessor='start'
            style={{
              backgroundColor: 'white',
              height: lastView === 'month' ? '35rem' : '50rem',
            }}
            endAccessor='end'
            slotPropGetter={slotStyleGetter}
            dayPropGetter={dayStyleGetter}
            messages={messages}
            eventPropGetter={appointmentStyleGetter}
            step={60}
            popup={false}
            timeslots={1}
            longPressThreshold={lastView === 'month' ? 30 : 0}
            onView={onViewChange}
            view={lastView}
            min={dates.add(
              dates.startOf(new Date(0, 0), 'day'),
              availableHours[0],
              'hours'
            )}
            max={dates.add(
              dates.endOf(new Date(0, 0), 'day'),
              availableHours[availableHours.length - 1] + 1,
              'hours'
            )}
            onSelectSlot={onSelectSlot}
            selectable={true}
            date={selectedDate}
            onNavigate={onNavigate}
            components={{
              event: CalendarAppointment,
            }}
          />
        </>
      )}

      <CalendarModal selectedDate={selectedDate} />
    </div>
  )
}
