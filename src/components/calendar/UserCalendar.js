import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as dates from '../../utils/dates'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarAppointment } from './CalendarAppointment'
import { UserCalendarModal } from './UserCalendarModal'
import { availableHours } from '../../utils/constants'

import { uiOpenModal } from '../../actions/ui'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { appointmentSetActive } from '../../actions/appointment'
import { DeleteAppointmentFab } from '../ui/DeleteAppointmentFab'
import { EditAppointmentFab } from '../ui/EditAppointmentFab'
import determineAvailability from '../../helpers/determineAvailability'
import { CalendarDay } from './CalendarDay'

moment.locale('es')

const localizer = momentLocalizer(moment)

export const UserCalendar = ({ show = false, cursorPointer }) => {
  const dispatch = useDispatch()
  const { activeAppointment, userAppointments } = useSelector(
    (state) => state.user
  )
  const { selectedService } = useSelector((state) => state.service)
  const { selectedClient } = useSelector((state) => state.client)
  const { loggedUser } = useSelector((state) => state.auth)
  const [selectedDate, setSelectedDate] = useState(moment().toDate())
  const [lastView, setLastView] = useState('day')

  const userAppointmentsWithReservation = userAppointments.filter(
    (a) => a.hasReserved || a.isValid
  )

  const onSelectAppointment = (appointment) => {
    dispatch(appointmentSetActive(appointment))
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (slot) => {
    if (lastView === 'month') {
      setSelectedDate(slot.slots[0])
      setLastView('day')
      localStorage.setItem('lastView', 'day')
    } else {
      setSelectedDate(slot.start)

      !show && dispatch(uiOpenModal())
    }
  }

  const onNavigate = (date) => setSelectedDate(moment(date).toDate())

  const appointmentStyleGetter = (appointment, start, end, isSelected) => {
    let reservationNotPayed =
      appointment.payments[0]?.status === 'PENDIENTE' ||
      !appointment.payments[0]

    let backgroundColor = reservationNotPayed ? '#ffbb00' : '#367CF7'
    let color = reservationNotPayed ? '#333' : 'white'

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: color,
    }

    return {
      style,
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
      loggedUser,
      lastView,
      userAppointmentsWithReservation,
      selectedService
    )
    console.log({ cursorPointer })

    const style = {
      background:
        isClosed || !isUserAvailable || !isPossibleToReservate
          ? '#ddd'
          : 'white',
      border: isClosed && '0px solid #ddd',
      width: '100%',
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
      loggedUser,
      lastView,
      userAppointmentsWithReservation
    )

    let backgroundColor = ''
    if (isClosed) {
      backgroundColor = '#ddd'
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
        availableAppointments &&
        (cursorPointer || lastView === 'month') > 0
          ? 'pointer'
          : 'normal',
      border: isClosed && '1px solid #ddd',
      width: '100%',
    }

    return {
      style,
    }
  }

  return (
    <div className={`${show ? 'user-calendar-screen' : 'calendar-screen'} `}>
      {(!!selectedClient || show) && (
        <Calendar
          localizer={localizer}
          events={userAppointmentsWithReservation}
          views={['month', 'day']}
          startAccessor='start'
          style={{ backgroundColor: 'white' }}
          endAccessor='end'
          slotPropGetter={slotStyleGetter}
          dayPropGetter={dayStyleGetter}
          messages={messages}
          eventPropGetter={appointmentStyleGetter}
          onSelectEvent={onSelectAppointment}
          step={60}
          popup={false}
          timeslots={1}
          longPressThreshold={80}
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
            month: {
              event: CalendarDay,
            },

            event: CalendarAppointment,
          }}
        />
      )}

      {activeAppointment && <DeleteAppointmentFab />}
      {activeAppointment && <EditAppointmentFab />}

      <UserCalendarModal selectedDate={selectedDate} />
    </div>
  )
}
