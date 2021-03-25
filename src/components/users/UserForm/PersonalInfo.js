import React from 'react'
import Input from '../../ui/Input'

const UserPersonalInfo = ({ userInfo, handleChange, addingUser }) => {
  const { name, lastname, email, phone, password, password2 } = userInfo

  return (
    <div>
      <Input
        type='text'
        placeholder='Nombre'
        name='name'
        value={name}
        handleChange={handleChange}
        required
        id='user-name'
      />
      <Input
        type='text'
        placeholder='Apellido'
        name='lastname'
        value={lastname}
        handleChange={handleChange}
        required
      />
      <Input
        type='email'
        placeholder='Correo'
        name='email'
        value={email}
        handleChange={handleChange}
        required
      />
      <Input
        type='tel'
        placeholder='Celular (sin 0 y sin 15)'
        name='phone'
        value={phone}
        handleChange={handleChange}
      />
      <Input
        type='password'
        placeholder='Contraseña'
        name='password'
        value={password}
        handleChange={handleChange}
        required={addingUser}
      />
      <Input
        type='password'
        placeholder='Repita la contraseña'
        name='password2'
        value={password2}
        handleChange={handleChange}
        required={addingUser}
      />
    </div>
  )
}

export default UserPersonalInfo
