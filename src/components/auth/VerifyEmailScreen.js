import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { fetchSinToken } from '../../helpers/fetch'
import Spinner from '../ui/Spinner'

import './login.css'

const VerifyEmailScreen = () => {
  const [clientActive, setClientActive] = useState(false)
  const { secretToken } = useParams()

  const history = useHistory()

  useEffect(() => {
    fetchSinToken(`client/verify/${secretToken}`, {}, 'POST')
      .then((resp) => {
        console.log('No entra acá!!!')
        return resp.json()
      })
      .then((result) => {
        if (!result.ok) {
          setClientActive(false)
          return Swal.fire({
            title: 'Código de validación incorrecto',
            html: `Si recibiste más de un email de validación, recuerda que solo es válido el <b> último</b> que te enviamos.</br> </br> 
             Si necesitas un nuevo email de validación, intenta iniciar sesión, y te daremos la opción de enviarte uno nuevo.`,
            icon: 'info',
            confirmButtonText: 'Ok, ir a inicio de sesión!',
          }).then((answer) => history.push('/clients/login'))
        }

        setClientActive(true)
      })
      .catch((err) => {
        setClientActive(false)
        return Swal.fire({
          title: 'Código de validación incorrecto',
          html: `Si recibiste más de un email de validación, recuerda que solo es válido el <b> último</b> que te enviamos.</br> </br> 
             Si necesitas un nuevo email de validación, intenta iniciar sesión, y te daremos la opción de enviarte uno nuevo.`,
          icon: 'info',
          confirmButtonText: 'Ok, ir a inicio de sesión!',
        }).then((answer) => history.push('/clients/login'))
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
          <a href='https://www.callmegrecia.com/clients/login'>
            Iniciar sesión
          </a>
        </button>
      </div>
    )
  }
}

export default VerifyEmailScreen
