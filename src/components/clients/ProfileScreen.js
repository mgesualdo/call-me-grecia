import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../ui/Spinner'
import { useForm } from '../../hooks/useForm'
import Input from '../ui/Input'
import { Navbar } from '../ui/Navbar'
import UploadImageButton from '../ui/UploadImageButton'
import ImagePreview from '../ui/ImagePreview'
import { useEffect } from 'react'
import { loginClient } from '../../actions/auth'
import { uiLoadingUpdatingClient, uiRefreshImage } from '../../actions/ui'
import Swal from 'sweetalert2'
import BirthdayPicker from '../ui/DropDowns/BirthayPicker'
import './profileScreen.css'

const baseUrl = process.env.REACT_APP_API_URL

const ProfileScreen = () => {
  const { loadingUpdatingClient } = useSelector((state) => state.ui)
  const { loggedClient } = useSelector((state) => state.auth)
  const [selectedDay, setSelectedDay] = useState()
  const [selectedMonth, setSelectedMonth] = useState()
  const [selectedYear, setSelectedYear] = useState()
  const [previewImageUrls, setPreviewImageUrls] = useState([
    `https://appturnos.blob.core.windows.net/clientes/${
      loggedClient.avatarName ? loggedClient.avatarName : 'no-user.png'
    }?${new Date().getTime()}`,
  ])
  const [avatarFiles, setAvatarFiles] = useState(null)

  const dispatch = useDispatch()

  const [formRegisterValues, handleChange] = useForm({
    name: loggedClient.name,
    lastname: loggedClient.lastname,
    email: loggedClient.email,
    dob: new Date(loggedClient.dob),
    cellphone: loggedClient.phones[0].number,
    avatarName: loggedClient.avatarName,
  })

  const { name, lastname, email, cellphone } = formRegisterValues

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(uiLoadingUpdatingClient(true))
    const formData = new FormData()
    if (avatarFiles) {
      formData.append('client-image', avatarFiles[0].file, avatarFiles[0].name)
    }
    formData.append('client', JSON.stringify(formRegisterValues))
    const url = `${baseUrl}/client/${loggedClient._id}`

    fetch(url, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => res.json())
      .then(({ ok, updatedClient }) => {
        if (ok) {
          dispatch(loginClient(updatedClient))
          Swal.fire('Listo!', `Tus datos actualizados con éxito!`, 'success')
        } else {
          Swal.fire('Error', 'Error al actualizar los datos', 'error')
        }

        dispatch(uiRefreshImage())
        dispatch(uiLoadingUpdatingClient(false))
      })
      .catch(console.error)
  }

  const handleImageChange = ({ target }) => {
    const file = target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImageUrls([reader.result])
        setAvatarFiles([{ file, name: file.name }])
      }
    }

    file && reader.readAsDataURL(file)
  }

  useEffect(() => {
    handleChange(`${selectedDay}/${selectedMonth}/${selectedYear}`)
  }, [selectedDay, selectedMonth, selectedYear])

  return (
    <>
      <Navbar />
      <div className='login-screen-container'>
        <div className='login-form-container'>
          <h3>Datos personales</h3>
          <form onSubmit={handleSubmit}>
            <div className='upload-image-container mt-3 profile'>
              <UploadImageButton
                inputId='client-image'
                icon='fas fa-camera-retro'
                handleChange={handleImageChange}
              />
              <ImagePreview
                previewImageUrls={previewImageUrls}
                setAvatarFiles={setAvatarFiles}
                setPreviewImageUrls={setPreviewImageUrls}
                relatedButtonId='client-image'
                size={9}
                imageIndex={0}
              />
            </div>
            <Input
              type='text'
              placeholder='Nombre'
              name='name'
              value={name}
              handleChange={handleChange}
            />

            <Input
              type='text'
              placeholder='Apellido'
              name='lastname'
              value={lastname}
              handleChange={handleChange}
            />

            <BirthdayPicker
              selectedDay={selectedDay}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedDay={setSelectedDay}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
              birthday={loggedClient.dob}
            />

            <Input
              type='email'
              placeholder='Correo'
              name='email'
              value={email}
              handleChange={handleChange}
            />

            <Input
              type='tel'
              placeholder='Celular (sin 0 y sin 15)'
              name='cellphone'
              value={cellphone}
              handleChange={handleChange}
            />

            <button type='submit' className='btn-submit'>
              {loadingUpdatingClient ? (
                <Spinner width='0.1rem' height='0.1rem' />
              ) : (
                'Actualizar'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProfileScreen
