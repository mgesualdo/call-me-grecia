import React from 'react'

const userUserFormValidation = (user) => {
  let isValid = false
  let errors = []

  if (!user.name) {
    return [false, 'No se puede crear un usuario sin nombre']
  } else if (!user.lastname) {
    return [false, 'No se puede crear un usuario sin apellido']
  } else if (!user.email) {
    return [false, 'No se puede crear un usuario sin email']
  } else if (!user.role) {
    return [false, 'No se puede crear un usuario sin asignarle un ROL']
  } else if (!user.lastname) {
    return [false, 'El campo apellido no puede estar vacío']
  } else if (!user.lastname) {
    return [false, 'El campo apellido no puede estar vacío']
  } else if (!user.lastname) {
    return [false, 'El campo apellido no puede estar vacío']
  }
}

export default userUserFormValidation
