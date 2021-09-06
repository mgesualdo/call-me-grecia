import React, { useState, Children, cloneElement } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as dates from '../../utils/dates'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarAppointment } from './CalendarAppointment'
import { UserCalendarModal } from './UserCalendarModal'
import { availableHours } from '../../utils/constants'
import { EditAppointmentFab } from '../../components/ui/Fabs/EditAppointmentFab'

import { uiOpenModal, uiOpenNewPaymentModal } from '../../actions/ui'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { appointmentSetActive } from '../../actions/appointment'
import determineAvailability from '../../helpers/determineAvailability'
import { CalendarDay } from './CalendarDay'
import { compareAsc, differenceInMilliseconds } from 'date-fns'
import { calculateBalance } from '../../helpers/calculateBalance'
import { NewPaymentModal } from '../payments/NewPaymentModal'
import { EditAppointmentModal } from './EditAppointmentModal'
import { useEffect } from 'react'
import { setSelectedUser } from '../../actions/users'

moment.locale('es')

const localizer = momentLocalizer(moment)

const TouchCellWrapper = ({ children, value, onSelectAppointment }) =>
  cloneElement(Children.only(children), {
    onTouchEnd: () => onSelectAppointment({ action: 'click', slots: [value] }),
  })

export const UserCalendar = ({
  show = false,
  cursorPointer,
  smaller = false,
}) => {
  const dispatch = useDispatch()
  const { userAppointments, activeAppointment } = useSelector(
    (state) => state.user
  )
  const { selectedService } = useSelector((state) => state.service)
  const { selectedClient } = useSelector((state) => state.client)
  const { selectedUser } = useSelector((state) => state.user)
  const { loggedUser } = useSelector((state) => state.auth)
  const [selectedDate, setSelectedDate] = useState(moment().toDate())
  const [whenWeGotToDayView, setWhenWeGotToDayView] = useState(null)
  const [lastView, setLastView] = useState('day')

  const onSelectAppointment = (appointment) => {
    if (smaller) return

    dispatch(uiOpenNewPaymentModal())
    dispatch(appointmentSetActive(appointment))
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (slot) => {
    if (smaller) {
      setSelectedDate(slot.slots[0])
    }
    if (
      lastView === 'day' &&
      differenceInMilliseconds(new Date(), whenWeGotToDayView) < 150
    )
      return

    if (lastView === 'month') {
      setSelectedDate(slot.slots[0])
      setWhenWeGotToDayView(new Date())
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

    const balance = calculateBalance(
      appointment?.price,
      appointment?.payments ?? []
    )

    const clientHasAttended = appointment?.hasAttended

    let backgroundColor = !clientHasAttended
      ? '#aa3388'
      : reservationNotPayed || balance > 0
      ? '#ffbb00'
      : '#367CF7'
    let color =
      (reservationNotPayed || balance > 0) && clientHasAttended
        ? '#333'
        : 'white'

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

  useEffect(() => {
    if (smaller) setSelectedDate(new Date(activeAppointment.start))
  }, [])

  const slotStyleGetter = (date) => {
    const [isClosed, isUserAvailable, , isPossibleToReservate] =
      determineAvailability(
        date,
        loggedUser,
        lastView,
        userAppointments,
        selectedService
      )

    const newAppointmentDate = smaller && compareAsc(selectedDate, date) === 0

    const style = {
      background: newAppointmentDate
        ? 'rgba(60, 161, 232, 0.4)'
        : isClosed || !isUserAvailable || !isPossibleToReservate
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
    const [isClosed, isUserAvailable, availableAppointments] =
      determineAvailability(date, loggedUser, lastView, userAppointments)

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

  console.log({
    areEquals: selectedService?._id === activeAppointment?.service?._id,
    selectedService,
    start: activeAppointment?.service?._id,
  })

  return (
    <div
      className={`${show ? 'user-calendar-screen' : 'calendar-screen'} ${
        smaller && 'smaller-calendar'
      }`}
    >
      {(!!selectedClient || show) && (
        <Calendar
          localizer={localizer}
          events={userAppointments}
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
          longPressThreshold={20}
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
            dateCellWrapper: (props) => (
              <TouchCellWrapper
                {...props}
                onSelectAppointment={onSelectAppointment}
              />
            ),
          }}
        />
      )}
      {smaller && <EditAppointmentFab />}

      <EditAppointmentModal selectedDate={selectedDate} />
      <UserCalendarModal selectedDate={selectedDate} />
      <NewPaymentModal />
    </div>
  )
}
