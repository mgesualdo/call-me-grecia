import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setSelectedClient, changeClientStatus } from '../../actions/client'
import Spinner from '../ui/Spinner'

import './client.css'

const Client = ({
  id,
  name,
  lastname,
  selectedService,
  avatarName,
  phones,
  active,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { loggedUser } = useSelector((state) => state.auth)
  const { selectedClient } = useSelector((state) => state.client)
  const { loadingUpdatingClient } = useSelector((state) => state.ui)

  const [clientStatus, setClientStatus] = useState(active)

  console.log({ loggedUser })

  const handleClick = () => {
    if (!!selectedService || history.location.pathname === '/users/clients') {
      if (selectedClient && selectedClient?._id === id) {
        dispatch(setSelectedClient({}))
      } else {
        dispatch(setSelectedClient(id))
      }
    } else {
      history.push('/users/login')
    }
  }

  const handleStatusClient = () => {
    dispatch(changeClientStatus(!clientStatus, id, setClientStatus))
  }

  return (
    <div className='client-container'>
      <div
        className={`client-detail ${selectedClient?._id === id && 'selected'}`}
        onClick={handleClick}
      >
        <div className='d-flex justify-content-start align-items-center'>
          <div
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '13rem',
              overflow: 'hidden',
              marginRight: '1rem',
              backgroundColor: '#eee',
            }}
          >
            <img
              src={`https://appturnos.blob.core.windows.net/clientes/${
                avatarName ? avatarName : 'no-user.png'
              }`}
              alt='Imagen del cliente'
              style={{
                width: '3rem',
                height: '3rem',
                objectFit: 'contain',
                backdropFilter: '',
              }}
            />
          </div>

          <div className=''>
            <h5 className='font-weight-bold client-name'>{`${lastname.toUpperCase()}, ${name}`}</h5>
            {['Gesualdo', 'Cadenas', 'Cardenas'].includes(
              loggedUser.lastname
            ) && (
              <span>
                <i className='fas fa-mobile-alt mr-2'></i>
                {`${phones[0].number}`}
              </span>
            )}
          </div>
        </div>
      </div>
      <div>
        {loadingUpdatingClient ? (
          <Spinner small />
        ) : (
          <button
            className={`btn-client-status ${
              clientStatus ? 'deactivate' : 'activate'
            }`}
            onClick={handleStatusClient}
          >
            {clientStatus ? 'Desactivar' : 'Activar'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Client
