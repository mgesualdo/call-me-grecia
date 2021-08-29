import { parseISO } from 'date-fns'

export const prepareAppointments = (appointments = []) => {
  return appointments.map((a) => ({
    ...a,
    end: parseISO(a.end),
    start: parseISO(a.start),
  }))
}

export const prepareAppointment = (appointment = {}) => {
  return {
    ...appointment,
    end: parseISO(appointment.end),
    start: parseISO(appointment.start),
    updatedAt: parseISO(appointment.updatedAt),
    //Corregido el TYPO
    createdAt: parseISO(appointment.createdAt),
  }
}
