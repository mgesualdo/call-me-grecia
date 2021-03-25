import React from 'react'

// import { useSelector } from 'react-redux'

import { UserNavbar } from '../ui/UserNavbar'
import './userProfileScreen.css'

const UserProfileScreen = () => {
  // const { loggedUser } = useSelector((state) => state.auth)

  return (
    <div>
      <UserNavbar />
      <div className='client-profile-form'>
        <h1>PROFILE USUARIO</h1>
      </div>
    </div>
  )
}

export default UserProfileScreen
