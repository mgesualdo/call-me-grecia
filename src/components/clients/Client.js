import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setSelectedClient } from '../../actions/client'

import './client.css'

const Client = ({
  id,
  name,
  lastname,
  selectedService,
  avatarName,
  phones,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.client)

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

  return (
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
          <h5 className='font-weight-bold'>{`${name} ${lastname}`}</h5>
          <span>
            <i className='fas fa-mobile-alt mr-2'></i>
            {`${phones[0].number}`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Client
