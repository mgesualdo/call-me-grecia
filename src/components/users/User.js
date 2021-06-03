import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUserAppointments, setSelectedUser } from '../../actions/users'

import './user.css'

const User = ({
  id,
  name,
  lastname,
  services,
  avatarName,
  phone,
  selectedServiceId,
  loggedClient,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { selectedUser } = useSelector((state) => state.user)

  const handleClick = () => {
    if (!!loggedClient) {
      if (selectedUser && selectedUser?._id === id) {
        dispatch(setSelectedUser({}))
      } else {
        dispatch(setSelectedUser(id))
        dispatch(getUserAppointments(id))
      }
    } else {
      history.push('/clients/login')
    }
  }

  return (
    <div
      className={`user-detail ${selectedUser?._id === id && 'selected'}`}
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
          }}
        >
          <img
            src={`https://appturnos.blob.core.windows.net/usuarios/${avatarName}`}
            alt='Imagen del usuario'
            style={{ width: '3rem', height: '3rem', objectFit: 'contain' }}
            className='no-selectable'
          />
        </div>
        <div className='no-selectable'>
          <h5 className='font-weight-bold'>{`${name} ${lastname}`}</h5>
        </div>
      </div>
      <div>
        <span className='price no-selectable'>
          ${services.find((s) => s.service?._id === selectedServiceId).price}
        </span>
      </div>
    </div>
  )
}

export default User
