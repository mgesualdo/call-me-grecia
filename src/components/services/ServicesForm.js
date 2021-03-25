import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from '../ui/ImagePreview'
import Input from '../ui/Input'
import UploadImageButton from '../ui/UploadImageButton'
import './ServicesForm.css'
import SubmitButton from '../ui/SubmitButton'
import Swal from 'sweetalert2'
import { getServices } from '../../actions/services'
import { emptyService } from '../../utils/constants'
import { toPropperCaseAndTrim } from '../../helpers/toPropperCase'
import { uiLoading } from '../../actions/ui'

const baseUrl = process.env.REACT_APP_API_URL

const ServicesForm = ({
  newService,
  setNewService,
  addingService,
  avatarFiles,
  setAvatarFiles,
  previewImageUrls,
  setPreviewImageUrls,
}) => {
  const { name, reservationCost, duration, description } = newService
  console.log(addingService)
  const dispatch = useDispatch()

  const { loading } = useSelector((state) => state.ui)

  const handleChange = ({ target }) => {
    setNewService({
      ...newService,
      [target.name]: target.value,
    })
  }

  const handleImageChange = ({ target }) => {
    const file = target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        let newPreviewImageUrls = [...previewImageUrls]
        newPreviewImageUrls[0] = reader.result
        setPreviewImageUrls(newPreviewImageUrls)
        let newAvatarFiles = [...avatarFiles]
        newAvatarFiles[0] = { file, name: file.name }
        setAvatarFiles(newAvatarFiles)
      }
    }
    file && reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    if (avatarFiles) {
      avatarFiles.map((avatarFile, index) => {
        if (avatarFile) {
          formData.append(
            'service-images',
            avatarFile.file,
            avatarFile.name + '|' + index
          )
        }
      })
    }

    newService.name = toPropperCaseAndTrim(newService.name, true)

    formData.append('service', JSON.stringify(newService))
    const url = `${baseUrl}/service${
      !addingService ? '/' + newService._id : ''
    }`
    dispatch(uiLoading(true))
    fetch(url, {
      method: addingService ? 'POST' : 'PUT',
      body: formData,
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.ok) {
          dispatch(getServices())
          setNewService(emptyService)
          setAvatarFiles([])
          setPreviewImageUrls([])
        } else {
          console.log(response)
          Swal.fire('Datos incorrectos', response.message, 'warning')
        }
        dispatch(uiLoading(false))
      })
      .catch((e) => {
        Swal.fire(
          'Error del servidor',
          'Contacte al administrador de la aplicación',
          'error'
        )
        dispatch(uiLoading(false))
      })
  }

  return (
    <form onSubmit={handleSubmit} className='services-form'>
      <h2 className='text-center mb-4'>
        {addingService ? 'Creando servicio' : 'Editando servicio'}
      </h2>
      <Input
        type='text'
        placeholder='Denominación'
        name='name'
        value={name}
        handleChange={handleChange}
        required
        id='service-name'
      />
      <div className='duration-reservation-image-container'>
        <div className='duration-reservation-container'>
          <div className='duration-input'>
            <label htmlFor='service-duration'>Duración</label>
            <Input
              type='number'
              placeholder='Duración'
              name='duration'
              value={duration}
              handleChange={handleChange}
              required
              id='service-duration'
            />
          </div>
          <div className='reservation-input'>
            <label htmlFor='service-duration'>Costo de la seña</label>
            <Input
              type='number'
              placeholder='Seña requerida'
              name='reservationCost'
              value={reservationCost}
              handleChange={handleChange}
              required
              id='service-reservationCost'
            />
          </div>
        </div>
        <div className='upload-image-container'>
          <UploadImageButton
            inputId='service-image'
            icon='fas fa-camera-retro'
            handleChange={handleImageChange}
          />
          <ImagePreview
            previewImageUrls={previewImageUrls}
            avatarFiles={avatarFiles}
            setAvatarFiles={setAvatarFiles}
            setPreviewImageUrls={setPreviewImageUrls}
            relatedButtonId='service-image'
            size={9}
            imageIndex={0}
          />
          <div className='secondary-service-images-container'>
            <ImagePreview
              previewImageUrls={previewImageUrls}
              avatarFiles={avatarFiles}
              setAvatarFiles={setAvatarFiles}
              setPreviewImageUrls={setPreviewImageUrls}
              relatedButtonId='service-image'
              size={4}
              imageIndex={1}
            />
            <ImagePreview
              previewImageUrls={previewImageUrls}
              avatarFiles={avatarFiles}
              setAvatarFiles={setAvatarFiles}
              setPreviewImageUrls={setPreviewImageUrls}
              relatedButtonId='service-image'
              size={4}
              imageIndex={2}
            />
            <ImagePreview
              previewImageUrls={previewImageUrls}
              avatarFiles={avatarFiles}
              setAvatarFiles={setAvatarFiles}
              setPreviewImageUrls={setPreviewImageUrls}
              relatedButtonId='service-image'
              size={4}
              imageIndex={3}
            />
          </div>
        </div>
      </div>
      <Input
        type='text-area'
        placeholder='Descripción'
        name='description'
        value={description}
        handleChange={handleChange}
        required
        id='service-description'
      />
      <SubmitButton
        adding={addingService}
        loading={loading}
        addingText='Crear servicio'
        editingText='Guardar cambios'
      />
    </form>
  )
}

export default ServicesForm
