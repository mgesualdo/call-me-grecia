import { getWeek } from 'date-fns'

export const usersFormTabsInfo = [
  { name: 'Datos personales', index: 0, icon: 'far fa-user' },
  { name: 'Configuración servicios', index: 1, icon: 'far fa-calendar-alt' },
]

export const availableHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

export const week = [
  { day: 'Lunes', dayShort: 'Lun', hours: availableHours },
  { day: 'Martes', dayShort: 'Mar', hours: availableHours },
  { day: 'Miércoles', dayShort: 'Mié', hours: availableHours },
  { day: 'Jueves', dayShort: 'Jue', hours: availableHours },
  { day: 'Viernes', dayShort: 'Vie', hours: availableHours },
  { day: 'Sábado', dayShort: 'Sáb', hours: availableHours },
  { day: 'Domingo', dayShort: 'Dom', hours: availableHours },
]

export const months = [
  { name: 'Enero', number: 1 },
  { name: 'Febrero', number: 2 },
  { name: 'Marzo', number: 3 },
  { name: 'Abril', number: 4 },
  { name: 'Mayo', number: 5 },
  { name: 'Junio', number: 6 },
  { name: 'Julio', number: 7 },
  { name: 'Agosto', number: 8 },
  { name: 'Septiembre', number: 9 },
  { name: 'Octubre', number: 10 },
  { name: 'Noviembre', number: 11 },
  { name: 'Diciembre', number: 12 },
]
export const daysOfMonth = Array.from({ length: 31 }, (_, index) => index + 1)

export const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index
)

export const colors = ['#137dd4', '#1ee391', '#b724ed']

export const currentWeek = getWeek(new Date())
export const weeksOfYearTillToday = Array.from(
  { length: currentWeek },
  (_, index) => index
)

export const userRoles = ['ADMIN', 'USER']
export const paymentTypes = ['SEÑA', 'PAGO TOTAL']
export const paymentKinds = ['Efectivo', 'Transferencia', 'Mercado Pago']
export const emptyUser = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
  services: [],
  workWeek: [
    { day: 'Lunes', dayShort: 'Lun', hours: [] },
    { day: 'Martes', dayShort: 'Mar', hours: [] },
    { day: 'Miércoles', dayShort: 'Mié', hours: [] },
    { day: 'Jueves', dayShort: 'Jue', hours: [] },
    { day: 'Viernes', dayShort: 'Vie', hours: [] },
    { day: 'Sábado', dayShort: 'Sáb', hours: [] },
    { day: 'Domingo', dayShort: 'Dom', hours: [] },
  ],
  roles: [],
  avatarName: '',
  password: '',
  password2: '',
}

export const emptyService = {
  name: '',
  duration: null,
  images: [],
  description: '',
}

export const clientMenuOptions = [
  {
    path: '/clients/profile',
    text: 'Mi perfil',
    icon: 'far fa-id-card',
  },
  {
    path: '/',
    text: 'Nuevo turno',
    icon: 'far fa-calendar-plus',
  },
  {
    path: '/clients/myappointments',
    text: 'Mis turnos',
    icon: 'far fa-calendar-check',
  },
  {
    path: '/clients/mypassword',
    text: 'Mi contraseña',
    icon: 'fas fa-key',
  },
]
export const userMenuOptions = [
  {
    path: '/users/profile',
    text: 'Mi perfil',
    icon: 'far fa-id-card',
    allowedRoles: ['ADMIN', 'USER'],
  },
  {
    path: '/users/calendario',
    text: 'Calendario',
    icon: 'far fa-calendar-alt',
    allowedRoles: ['ADMIN', 'USER'],
  },
  {
    path: '/users/appointments/create',
    text: 'Nuevo turno',
    icon: 'far fa-calendar-plus',
    allowedRoles: ['ADMIN', 'USER'],
  },
  {
    path: '/users/novelties',
    text: 'Nueva novedad',
    icon: 'far fa-newspaper',
    allowedRoles: ['ADMIN', 'USER'],
  },
  {
    path: '/users/clients',
    text: 'Clientes',
    icon: 'fas fa-users',
    allowedRoles: ['ADMIN', 'USER'],
  },
  {
    path: '/users/services',
    text: 'Servicios',
    icon: 'fas fa-concierge-bell',
    allowedRoles: ['ADMIN'],
  },
  {
    path: '/users/users',
    text: 'Usuarios',
    icon: 'fas fa-users-cog',
    allowedRoles: ['ADMIN'],
  },
  {
    path: '/users/reports',
    text: 'Informes',
    icon: 'fas fa-chart-line',
    allowedRoles: ['ADMIN', 'USER'],
  },
]
