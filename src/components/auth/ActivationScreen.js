import React from 'react'
import { useParams } from 'react-router-dom'

const ActivationScreen = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>El id del usuario a activa es: {id}</h1>
    </div>
  )
}

export default ActivationScreen
