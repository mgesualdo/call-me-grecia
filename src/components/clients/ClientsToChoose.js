import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Client from './Client'
import { getClients } from '../../actions/client'
import './clientsToChoose.css'
import Spinner from '../ui/Spinner'

const ClientsToChoose = ({ show = false }) => {
  const { clients } = useSelector((state) => state.client)
  const { loadingClients } = useSelector((state) => state.ui)
  const { selectedService } = useSelector((state) => state.service)

  const [textToSearch, setTextToSearch] = useState('')
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setTextToSearch(e.target.value)
    dispatch(getClients(e.target.value))
  }

  return (
    <div className='clients-search-container'>
      <input
        className='buscar-cliente'
        type='text'
        placeholder='Buscar cliente...'
        value={textToSearch}
        id='buscar-servicio'
        autoComplete='off'
        onChange={handleInputChange}
      />
      {loadingClients && <Spinner />}
      <div className='clients-list'>
        {(selectedService || show) &&
          clients.map((client) => (
            <Client
              key={client._id}
              id={client._id}
              name={client.name}
              lastname={client.lastname}
              selectedService={selectedService}
              avatarName={client.avatarName}
              phones={client.phones}
            />
          ))}
      </div>
    </div>
  )
}

export default ClientsToChoose
