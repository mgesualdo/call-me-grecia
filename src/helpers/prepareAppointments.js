import moment from 'moment'

export const prepareAppointments = (appointments = []) => {
  return appointments.map((a) => ({
    ...a,
    end: moment(a.end).toDate(),
    start: moment(a.start).toDate(),
  }))
}
