import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { UserNavbar } from '../ui/UserNavbar'

import './homeScreen.css'
import { useHistory, useLocation } from 'react-router'
import Appointment from '../clients/Appointment'
import UploadImageButton from '../ui/UploadImageButton'

const baseUrl = process.env.REACT_APP_API_URL

const AddAttachmentScreen = () => {
  const [selectedFiles, setFiles] = useState([])

  const location = useLocation()
  const { appointment } = location.state

  const history = useHistory()

  const handleImageChange = ({ target }) => {
    const files = target.files
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()

      let f = files.item(i)

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFiles((prev) => [...prev, { file: f, name: f.name }])
        }
      }
      f && reader.readAsDataURL(f)
    }
  }

  const handleSumbit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    selectedFiles.map((f) => {
      formData.append(`attachments`, f.file, f.name)
    })

    const url = `${baseUrl}/appointment/attachment/${appointment._id}`

    fetch(url, {
      method: 'PUT',
      body: formData,
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
        <h1>Agregar documento adjunto</h1>
        <div style={{ maxWidth: '20rem' }}>
          <Appointment key={appointment._id} appointment={appointment} />

          <div
            style={{
              backgroundColor: 'white',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              borderRadius: '1rem',
              marginTop: '2rem',
              width: '28rem',
            }}
          >
            <UploadImageButton
              inputId='user-image'
              icon='fas fa-camera-retro'
              handleChange={handleImageChange}
              multiple={true}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem',
              }}
            >
              {selectedFiles.map((f, index) => (
                <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <h4>{index + 1}</h4>
                  <h4>) </h4>
                  <h4 style={{ marginLeft: '0.5rem' }}>{f.name}</h4>
                </div>
              ))}
            </div>

            {selectedFiles.length > 0 && (
              <button
                style={{
                  padding: '1rem',
                  fontSize: '1.2rem',
                  border: 'none',
                  fontWeight: 'bold',
                  borderRadius: '1rem',
                  width: '13rem',
                  marginTop: '1rem',
                }}
                onClick={handleSumbit}
              >
                Enviar
              </button>
            )}
          </div>
          <h2
            style={{
              marginTop: '2rem',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            Adjuntos:
          </h2>
          <div
            style={{
              display: 'flex',
              marginTop: '2rem',
              width: '30rem',
              overflow: 'hidden',
              overflowX: 'scroll',
            }}
          >
            {appointment?.attachments?.map((fileName) => (
              <img
                style={{ width: '20rem', height: '20rem', marginRight: '1rem' }}
                src={`https://appturnos.blob.core.windows.net/turnos/${fileName}`}
                alt=''
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddAttachmentScreen
