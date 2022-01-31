import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment'
import Modal from 'react-modal'

import { uiCloseModal } from '../../actions/ui'
import { getProducts } from '../../actions/products'

import './productModal.css'
import ImageAndName from '../ui/ImageAndName'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'
import { fetchSinToken } from '../../helpers/fetch'
import ProductNovelyTypes from './ProductNovelyTypes'
import { productNoveltyTypes } from '../../utils/constants'
import Input from '../ui/Input'

moment.locale('ar')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#root')

export const ProductNoveltyModal = ({ selectedProduct }) => {
  const { modalOpen } = useSelector((state) => state.ui)

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    type: 'Compra',
    product: '',
    quantity: 0,
    unitPrice: 0,
    totalCost: 0,
    details: '',
  })

  useEffect(() => {
    setFormValues(() => ({
      product: selectedProduct?._id,
    }))
  }, [selectedProduct])

  const closeModal = () => {
    dispatch(uiCloseModal())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetchSinToken('product/novelty', formValues, 'POST')
    const body = await res.json()
    setLoading(false)

    console.log({ res, body })

    if (body.ok) {
      await Swal.fire('Listo', 'Novedad creada con éxito!', 'success')
      dispatch(getProducts())
      closeModal()
    } else {
      await Swal.fire('UPS', 'Hubo un error al crear la novedad!', 'danger')
    }
  }

  const handleSelectType = (type) => {
    setFormValues({
      ...formValues,
      type,
    })
  }

  const handleChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className='modal'
      overlayClassName='modal-fondo'
    >
      <div
        key={selectedProduct?._id}
        id={selectedProduct?._id}
        className='modal-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ textAlign: 'center', margin: '0.2rem 0 1rem 0' }}>
          Nueva novedad
        </h1>

        <ImageAndName
          name={selectedProduct?.name}
          imageName={selectedProduct?.images[0]}
          product
        />

        <ProductNovelyTypes
          acceptedTypes={productNoveltyTypes}
          handleSelect={handleSelectType}
          selectedType={formValues.type}
        />

        <div style={{ marginTop: '1.5rem' }}>
          <label htmlFor='product-quantity' style={{ marginBottom: '-1rem' }}>
            Cantidad
          </label>
          <Input
            type='number'
            placeholder=''
            name='quantity'
            handleChange={handleChange}
            required
            id='product-quantity'
          />

          <label htmlFor='product-price' style={{ marginBottom: '-0.9rem' }}>
            Precio unitario
          </label>
          <Input
            type='number'
            placeholder=''
            name='unitPrice'
            handleChange={handleChange}
            required
            id='product-price'
          />
          <Input
            type='text-area'
            placeholder='Descripción'
            name='details'
            handleChange={handleChange}
            required
            id='product-detail'
          />
        </div>
      </div>

      <div className='buttons-container'>
        <button
          type='submit'
          className='modal-button full-payment-button'
          onClick={handleSubmit}
        >
          {loading ? (
            <Spinner />
          ) : (
            <div>
              <span>Crear novedad </span>
            </div>
          )}
        </button>
      </div>
    </Modal>
  )
}
