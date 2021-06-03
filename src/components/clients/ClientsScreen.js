import React from 'react'

import { UserNavbar } from '../ui/UserNavbar'

import ClientsToChoose from '../clients/ClientsToChoose'
import { useDispatch, useSelector } from 'react-redux'
import Appointment from './Appointment'
import { getClientAppointments } from '../../actions/client'
import { useEffect } from 'react'
import { clearActiveAppointment } from '../../actions/appointment'
import Spinner from '../ui/Spinner'

const ClientsScreen = () => {
  const { clientAppointments, selectedClient } = useSelector(
    (state) => state.client
  )
  const { loading } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedClient) {
      dispatch(getClientAppointments(selectedClient._id))
    }

    return () => dispatch(clearActiveAppointment())
  }, [selectedClient, dispatch])

  return (
    <>
      <UserNavbar />
      <div className='container-clientes'>
        <ClientsToChoose show />

        <div className='appointments-container small'>
          {loading && <Spinner />}

          {clientAppointments.length > 0 &&
            selectedClient &&
            clientAppointments.map((appointment) => (
              <Appointment key={appointment._id} appointment={appointment} />
            ))}
        </div>
      </div>
    </>
  )
}

export default ClientsScreen
