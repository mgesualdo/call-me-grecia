import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSinToken } from '../../helpers/fetch'
import Spinner from '../ui/Spinner'

import './login.css'

const VerifyEmailScreen = () => {
  const [clientActive, setClientActive] = useState(false)
  const { secretToken } = useParams()

  useEffect(() => {
    fetchSinToken(`client/verify/${secretToken}`, {}, 'POST')
      .then((resp) => {
        console.log('No entra acá!!!')
        return resp.json()
      })
      .then((result) => {
        if (!result.ok) return

        setClientActive(true)
      })
  }, [secretToken])

  if (!clientActive) {
    return (
      <div className='spinner-validating-client'>
        <Spinner bigg changeColor />
      </div>
    )
  } else {
    return (
      <div className='validated-client-container'>
        <h1 style={{ fontWeight: 'bold' }}>Felicitaciones 🥳 !</h1>
        <p>Tu email ya fue verificado, ya puedes iniciar sesión!</p>
        <button className='btn-go-to-register'>
          <a href='https://api-callmegrecia.herokuapp.com/clients/login'>
            Iniciar sesión
          </a>
        </button>
      </div>
    )
  }
}

export default VerifyEmailScreen
