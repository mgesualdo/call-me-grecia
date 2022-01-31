import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from '../ui/ImagePreview'
import Input from '../ui/Input'
import UploadImageButton from '../ui/UploadImageButton'
import './ProductsForm.css'
import SubmitButton from '../ui/SubmitButton'
import Swal from 'sweetalert2'
import { getProducts } from '../../actions/products'
import { emptyProduct } from '../../utils/constants'
import { toPropperCaseAndTrim } from '../../helpers/toPropperCase'
import { uiLoading } from '../../actions/ui'

const baseUrl = process.env.REACT_APP_API_URL

const ProductsForm = ({
  newProduct,
  setNewProduct,
  addingProduct,
  avatarFiles,
  setAvatarFiles,
  previewImageUrls,
  setPreviewImageUrls,
}) => {
  const { name, price, description } = newProduct

  const dispatch = useDispatch()

  const { loading } = useSelector((state) => state.ui)

  const handleChange = ({ target }) => {
    setNewProduct({
      ...newProduct,
      [target.name]: target.value,
    })
  }

  const handleImageChange = (e, imageIndex) => {
    const { target } = e
    const file = target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        let newPreviewImageUrls = [...previewImageUrls]
        newPreviewImageUrls[imageIndex] = reader.result
        setPreviewImageUrls(newPreviewImageUrls)
        let newAvatarFiles = [...avatarFiles]
        newAvatarFiles[imageIndex] = { file, name: file.name }
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
            'product-images',
            avatarFile.file,
            avatarFile.name + '|' + index
          )
        }
      })
    }

    newProduct.name = toPropperCaseAndTrim(newProduct.name, true)

    formData.append('product', JSON.stringify(newProduct))
    const url = `${baseUrl}/product${
      !addingProduct ? '/' + newProduct._id : ''
    }`
    dispatch(uiLoading(true))
    fetch(url, {
      method: addingProduct ? 'POST' : 'PUT',
      body: formData,
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.ok) {
          dispatch(getProducts())
          setNewProduct(emptyProduct)
          setAvatarFiles([])
          setPreviewImageUrls([])
          Swal.fire('Listo!', response.message, 'success')
        } else {
          console.log(response)
          Swal.fire('Datos incorrectos', response.message, 'warning')
        }
        dispatch(uiLoading(false))
      })
      .catch((e) => {
        console.log({ e })
        Swal.fire(
          'Error del servidor',
          'Contacte al administrador de la aplicación',
          'error'
        )
        dispatch(uiLoading(false))
      })
  }

  return (
    <form onSubmit={handleSubmit} className='products-form'>
      <h2 className='text-center mb-4'>
        {addingProduct ? 'Creando producto' : 'Editando producto'}
      </h2>
      <Input
        type='text'
        placeholder='Denominación'
        name='name'
        value={name}
        handleChange={handleChange}
        required
        id='product-name'
      />
      <div className='price-reservation-image-container'>
        <div className='price-reservation-container'>
          <div className='price-input'>
            <label htmlFor='product-price'>Precio</label>
            <Input
              type='number'
              placeholder=''
              name='price'
              value={price}
              handleChange={handleChange}
              required
              id='product-price'
            />
          </div>
        </div>
        <div className='upload-image-container'>
          <UploadImageButton
            inputId='product-1'
            icon='fas fa-camera-retro'
            handleChange={(e) => handleImageChange(e, 0)}
            show={false}
          />
          <UploadImageButton
            inputId='product-2'
            icon='fas fa-camera-retro'
            handleChange={(e) => handleImageChange(e, 1)}
            show={false}
          />
          <UploadImageButton
            inputId='product-3'
            icon='fas fa-camera-retro'
            handleChange={(e) => handleImageChange(e, 2)}
            show={false}
          />
          <UploadImageButton
            inputId='product-4'
            icon='fas fa-camera-retro'
            handleChange={(e) => handleImageChange(e, 3)}
            show={false}
          />
          <ImagePreview
            previewImageUrls={previewImageUrls}
            avatarFiles={avatarFiles}
            setAvatarFiles={setAvatarFiles}
            setPreviewImageUrls={setPreviewImageUrls}
            relatedButtonId='product-1'
            size={9}
            imageIndex={0}
          />
          <div className='secondary-product-images-container'>
            <ImagePreview
              previewImageUrls={previewImageUrls}
              avatarFiles={avatarFiles}
              setAvatarFiles={setAvatarFiles}
              setPreviewImageUrls={setPreviewImageUrls}
              relatedButtonId='product-2'
              size={4}
              imageIndex={1}
            />
            <ImagePreview
              previewImageUrls={previewImageUrls}
              avatarFiles={avatarFiles}
              setAvatarFiles={setAvatarFiles}
              setPreviewImageUrls={setPreviewImageUrls}
              relatedButtonId='product-3'
              size={4}
              imageIndex={2}
            />
            <ImagePreview
              previewImageUrls={previewImageUrls}
              avatarFiles={avatarFiles}
              setAvatarFiles={setAvatarFiles}
              setPreviewImageUrls={setPreviewImageUrls}
              relatedButtonId='product-4'
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
        id='product-description'
      />
      <SubmitButton
        adding={addingProduct}
        loading={loading}
        addingText='Crear producto'
        editingText='Guardar cambios'
      />
    </form>
  )
}

export default ProductsForm
