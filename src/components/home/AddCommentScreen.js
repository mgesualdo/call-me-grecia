import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { UserNavbar } from '../ui/UserNavbar'

import './homeScreen.css'
import { useHistory, useLocation } from 'react-router'
import Appointment from '../clients/Appointment'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

const baseUrl = process.env.REACT_APP_API_URL

const AddCommentScreen = () => {
  const { loggedUser } = useSelector((state) => state.auth)
  const [commentText, setCommentText] = useState('')

  const location = useLocation()
  const { appointment } = location.state

  console.log({ appointment })

  const history = useHistory()

  const handleSumbit = (e) => {
    e.preventDefault()
    if (!commentText) return

    const url = `${baseUrl}/appointment/comment/${appointment._id}`

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        text: commentText,
        user: loggedUser._id,
        userName: loggedUser.name + ' ' + loggedUser.lastname,
        avatarName: loggedUser.avatarName,
      }),
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.ok) {
          Swal.fire('Listo!', response.message, 'success')
          history.goBack()
        } else {
          Swal.fire('Datos incorrectos', response.message, 'warning')
        }
      })
      .catch((e) => {
        Swal.fire(
          'Error del servidor',
          'Contacte al administrador de la aplicación',
          'error'
        )
      })
  }

  return (
    <>
      <UserNavbar />

      <div style={{ maxWidth: '95%', padding: '2rem' }}>
        <h1>Agregar nu nuevo comentario:</h1>
        <div style={{ maxWidth: '20rem' }}>
          <Appointment key={appointment._id} appointment={appointment} />
          <div
            style={{
              width: '27rem',
              backgroundColor: 'white',
              marginTop: '2rem',
              padding: '1rem',
              borderRadius: '0.5rem',
            }}
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder='Escribir un comentario...'
              rows={5}
              style={{ width: '100%', padding: '0.5rem' }}
            />
            {!!commentText && (
              <button
                style={{
                  padding: '1rem',
                  fontSize: '1rem',
                  border: 'none',
                  fontWeight: 'bold',
                  borderRadius: '1rem',
                  width: '100%',
                  marginTop: '1rem',
                }}
                onClick={handleSumbit}
              >
                Enviar comentario
              </button>
            )}
          </div>
          <div
            style={{
              width: '27rem',
              backgroundColor: 'white',
              marginTop: '2rem',
              padding: '1rem',
              borderRadius: '0.5rem',
            }}
          >
            <h3
              style={{
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              Comentarios:
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem',
                width: '100%',
              }}
            >
              {appointment?.comments?.map((c) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <span>{format(new Date(c.createdAt), 'dd/MM hh:mm')}</span>
                  <div style={{ display: 'flex', marginTop: '0.2rem' }}>
                    <div className='comment'>
                      <img
                        src={`https://appturnos.blob.core.windows.net/usuarios/${c.avatarName}`}
                        alt='Imagen del usuario'
                      />
                    </div>
                    <span>{c.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCommentScreen
