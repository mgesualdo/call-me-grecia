import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { appointmentStartCancelation } from '../../../actions/appointment'
import { differenceInMinutes, parseISO } from 'date-fns'
import './cancelAppointmentFab.css'
import Spinner from '../Spinner'

export const CancelAppointmentFab = ({ appointment }) => {
  const { loading } = useSelector((state) => state.ui)
  const { loggedUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleCancel = () => {
    const paymentsToBeRefunded = appointment?.payments.filter(
      (p) =>
        differenceInMinutes(new Date(), parseISO(p.createdAt)) <= 300 &&
        p.status === 'APROBADO'
    )

    const paymentsToNotBeRefunded = appointment?.payments.filter(
      (p) =>
        differenceInMinutes(new Date(), parseISO(p.createdAt)) > 300 &&
        p.status === 'APROBADO'
    )

    if (paymentsToBeRefunded?.length > 0) {
      Swal.fire({
        title: 'Estás segur@?',
        html:
          'Si cancelas tu turno ahora, te devolveremos el dinero de tu seña.',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Sí, quiero cancelar!',
      }).then(async (answer) => {
        if (answer.isConfirmed)
          dispatch(appointmentStartCancelation(appointment))
      })
      return
    }

    if (paymentsToNotBeRefunded?.length > 0) {
      Swal.fire({
        title: 'Estás segur@?',
        html:
          '</br>Ya pasaron más de 5 horas de confirmada tu reserva, si cancelas ahora, <b style="color: #d33">perderás el dinero de tu seña</b>.</br>',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Sí, quiero cancelar!',
      }).then(async (answer) => {
        if (answer.isConfirmed)
          dispatch(appointmentStartCancelation(appointment))
      })
      return
    }

    Swal.fire({
      title: `Quieres cancelar ${!!loggedUser ? 'este' : 'tu'} turno?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, gracias!',
      confirmButtonText: 'Sí, por favor!',
    }).then(async (answer) => {
      if (answer.isConfirmed) dispatch(appointmentStartCancelation(appointment))
    })
  }

  return (
    <>
      <button className='cancel-fab' onClick={handleCancel}>
        {loading ? (
          <Spinner smallest />
        ) : (
          <>
            <i className='fas fa-times'></i>
            Cancelar
          </>
        )}
      </button>
    </>
  )
}
