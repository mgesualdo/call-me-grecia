import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const UsersToChoose = () => {
  const { loggedClient } = useSelector((state) => state.auth)
  const { users } = useSelector((state) => state.user)
  const { selectedService } = useSelector((state) => state.service)

  return (
    <>
      {selectedService && (
        <>
          <h3 className='mb-3 ml-1 service-title'>Elegí un profesional</h3>
          <div className='users-list'>
            {users
              .filter((user) =>
                user.services.some(
                  (s) => s.service?._id === selectedService?._id
                )
              )
              .map((user) => (
                <User
                  key={user._id}
                  id={user._id}
                  name={user.name}
                  lastname={user.lastname}
                  services={user.services}
                  avatarName={user.avatarName}
                  phone={user.phone}
                  selectedServiceId={selectedService?._id}
                  loggedClient={loggedClient}
                />
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default UsersToChoose
