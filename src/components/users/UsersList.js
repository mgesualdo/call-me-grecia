import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../actions/users'
import { emptyUser } from '../../utils/constants'
import DeleteButton from '../ui/Buttons/DeleteButton'
import Spinner from '../ui/Spinner'
import './usersList.css'

const UsersList = ({
  setAddingUser,
  setAvatarFiles,
  setPreviewImageUrls,
  setNewUser,
}) => {
  const { users } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleDeleteUser = (userId) => dispatch(deleteUser(userId))
  const handleAddUser = () => {
    setAddingUser(true)
    setNewUser(emptyUser)
    setPreviewImageUrls([])
    setAvatarFiles([])
  }
  const handleEditUser = ({
    _id,
    name,
    lastname,
    email,
    phone = '',
    roles,
    services,
    avatarName,
    appointmentsLimitations,
    novelties,
  }) => {
    setAddingUser(false)
    setNewUser({
      _id,
      name,
      lastname,
      email,
      phone,
      novelties,
      services: [
        ...services.map((s) => ({ service: s.service._id, price: s.price })),
      ],
      workWeek:
        appointmentsLimitations.workWeek.length > 0
          ? appointmentsLimitations.workWeek
          : emptyUser.workWeek,
      roles,
      avatarName,
      password: '',
      password2: '',
    })
    setPreviewImageUrls([
      `https://appturnos.blob.core.windows.net/usuarios/${avatarName}?${new Date().getTime()}`,
    ])
    setAvatarFiles([])
    const userNameInput = document.getElementById('user-name')
    userNameInput && userNameInput.focus()
  }

  return (
    <div className='users-container'>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='btn btn-primary mb-2 button-add-on-list'
          style={{
            width: '11rem',
            backgroundColor: '#dabcb2',
            color: 'black',
            border: 'none',
            fontWeight: 'bold',
          }}
          onClick={handleAddUser}
        >
          <i className='fas fa-plus mr-2'></i>
          Agregar usuario
        </button>
      </div>
      {users.map((user) => (
        <div key={user._id} className='user-container'>
          <div style={{ width: '45%' }}>
            <img
              src={`https://appturnos.blob.core.windows.net/usuarios/${
                user.avatarName
              }?${new Date().getTime()}`}
              alt=''
              style={{
                width: '2rem',
                marginRight: '0.7rem',
                borderRadius: '2rem',
              }}
            />
            <span>
              {user.name} {user.lastname}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              width: '31%',
              justifyContent: 'center',
            }}
          >
            <h6 className='d-flex flex-end'>
              {user.roles.sort().map((r) => (
                <span
                  className={`badge badge-${
                    r === 'ADMIN' ? 'primary' : 'secondary'
                  } mr-1`}
                  key={r}
                >
                  {r}
                </span>
              ))}
            </h6>
          </div>

          <div
            style={{
              display: 'flex',
              width: '23%',
              justifyContent: 'flex-end',
            }}
          >
            <button
              className='btn btn-warning mr-3'
              onClick={() => handleEditUser(user)}
            >
              <i className='fas fa-edit'></i>
            </button>

            <DeleteButton
              handleDelete={handleDeleteUser}
              idToDelete={user._id}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default UsersList
