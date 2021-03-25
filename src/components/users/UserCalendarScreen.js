import React from 'react'
import { UserCalendar } from '../calendar/UserCalendar'
import { UserNavbar } from '../ui/UserNavbar'

const UserCalendarScreen = () => {
  return (
    <div>
      <UserNavbar />

      <UserCalendar show cursorPointer={false} />
    </div>
  )
}

export default UserCalendarScreen
