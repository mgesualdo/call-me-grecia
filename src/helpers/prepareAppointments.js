import moment from 'moment'

export const prepareAppointments = (appointments = []) => {
  return appointments.map((a) => ({
    ...a,
    end: moment(a.end).toDate(),
    start: moment(a.start).toDate(),
  }))
}

export const prepareAppointment = (appointment = {}) => {
  return {
    ...appointment,
    end: moment(appointment.end).toDate(),
    start: moment(appointment.start).toDate(),
    updatedAt: moment(appointment.updatedAt).toDate(),
    createdAtd: moment(appointment.createdAtd).toDate(),
  }
}
