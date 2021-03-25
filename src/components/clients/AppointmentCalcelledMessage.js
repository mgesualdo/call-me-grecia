import React from 'react'
import DangerIcon from '../ui/Icons/DangerIcon'

const AppointmentCalcelledMessage = () => {
  return (
    <div className='did-not-reserve'>
      <DangerIcon
        title='Se agotó el tiempo para realizar el pago'
        largeToolip
        showText={false}
      />
      <span>Turno anulado</span>
    </div>
  )
}

export default AppointmentCalcelledMessage
