import {
  parseISO,
  toDate,
  addHours,
  isToday as checkIsToday,
  getDayOfYear,
  getHours,
  differenceInDays,
  differenceInMinutes,
} from 'date-fns'

const determineAvailability = (
  date,
  user,
  lastView,
  userAppointments,
  selectedService
) => {
  const weekDay = toDate(date).getDay() === 0 ? 6 : toDate(date).getDay() - 1

  const isToday = checkIsToday(date)

  const todayUserHoursFoundOnNovelties = user.appointmentsLimitations.workWeek[
    weekDay
  ]?.hours?.filter((h) => {
    const hoursInNovelty = user.novelties.find(
      (novelty) =>
        addHours(toDate(date).setHours(0, 0, 0, 0), h) >=
          parseISO(novelty.start) &&
        addHours(toDate(date).setHours(0, 0, 0, 0), h) <= parseISO(novelty.end)
    )

    return hoursInNovelty ? true : false
  }).length

  const todayUserAppointments = userAppointments.filter(
    (a) =>
      getDayOfYear(a.start) === getDayOfYear(date) &&
      getHours(a.start) > getHours(new Date())
  ).length

  let todayAvailableAppointments = 0

  if (isToday) {
    todayAvailableAppointments = user.appointmentsLimitations.workWeek[
      weekDay
    ]?.hours?.filter((h) => h > getHours(new Date())).length
  } else {
    todayAvailableAppointments =
      user.appointmentsLimitations.workWeek[weekDay]?.hours?.length
  }

  const isClosed =
    todayAvailableAppointments === 0 ||
    differenceInDays(date, new Date()) > 30 ||
    (differenceInDays(date, new Date()) < 0 && lastView === 'month') ||
    (differenceInMinutes(date, new Date()) < 0 && lastView === 'day')

  const isUserAvailable =
    user.appointmentsLimitations.workWeek[weekDay].hours.includes(
      getHours(date)
    ) &&
    user?.novelties.filter(
      (n) => date >= parseISO(n.start) && date <= parseISO(n.end)
    ).length === 0

  const availableAppointments =
    todayAvailableAppointments -
    todayUserAppointments -
    todayUserHoursFoundOnNovelties

  const serviceHoursDurationRounded = Math.ceil(selectedService?.duration / 60)
  let isReservationPossibleTakingInCountServiceDuration

  // Chequeamos si la duración del servicio es demasiado larga para ver
  // en qué horarios tendría que ser posible sacar turno del mismo
  if (
    (serviceHoursDurationRounded + getHours(date) > 13 &&
      getHours(date) <= 12) ||
    (serviceHoursDurationRounded + getHours(date) > 20 && getHours(date) > 12)
  ) {
    isReservationPossibleTakingInCountServiceDuration = false
  } else {
    isReservationPossibleTakingInCountServiceDuration = true
  }

  return [
    isClosed,
    isUserAvailable,
    availableAppointments,
    isReservationPossibleTakingInCountServiceDuration,
  ]
}

export default determineAvailability
