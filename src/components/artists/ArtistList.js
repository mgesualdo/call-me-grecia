import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAppointments, setSelectedUser } from '../../actions/users'

const ArtistList = () => {
  const { users, selectedUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    console.log(e.target.value)
    dispatch(setSelectedUser(e.target.value))
    dispatch(getUserAppointments(e.target.value))
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <select
        name='artist'
        value={!!selectedUser ? selectedUser._id : ''}
        onChange={handleChange}
        className='form-control artist-list'
      >
        <option value=''></option>
        {users.map(({ _id, name, lastname }) => (
          <option value={`${_id}`} key={_id}>
            {`${name} ${lastname}`}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ArtistList
