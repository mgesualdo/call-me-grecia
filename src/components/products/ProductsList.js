import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { getProducts } from '../../actions/products'
import { emptyProduct } from '../../utils/constants'
import { ProductNoveltyModal } from './ProductNoveltyModal'
import './productsList.css'

const ProductsList = ({
  setAddingProduct,
  setAvatarFiles,
  setPreviewImageUrls,
  setNewProduct,
}) => {
  const { products } = useSelector((state) => state.product)
  const [selectedProduct, setSelectedProduct] = useState()
  const [searchText, setSearchText] = useState()

  const handleAddProduct = () => {
    setAddingProduct(true)
    setNewProduct(emptyProduct)
    setPreviewImageUrls([])
    setAvatarFiles([])
  }

  console.log({ searchText })

  const dispatch = useDispatch()

  const handleEditProduct = ({ _id, name, price, description, images }) => {
    setAddingProduct(false)
    console.log('LA PUTA QUE TE PARIO!!')
    setNewProduct({
      _id,
      name,
      price,
      description,
      images,
    })
    let newPreviewImageUrls = []
    images.map((imageName, index) => {
      newPreviewImageUrls[
        index
      ] = `https://appturnos.blob.core.windows.net/productos/${imageName}?${new Date().getTime()}`
    })
    setPreviewImageUrls(newPreviewImageUrls)
    setAvatarFiles([])
  }

  const handleAddProductNovelty = (product) => {
    dispatch(uiOpenModal())
    setSelectedProduct(product)
  }

  return (
    <div className='products-container'>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='btn btn-primary button-add-on-list'
          style={{
            width: '190px',
            marginBottom: '1rem',
            backgroundColor: '#dabcb2',
            color: 'black',
            border: 'none',
            fontWeight: 'bold',
          }}
          onClick={handleAddProduct}
        >
          <i className='fas fa-plus mr-2'></i>
          Agregar producto
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          marginTop: '1rem',
        }}
      >
        <i
          className='fas fa-search'
          style={{ position: 'absolute', left: '0.75rem', top: '0.88rem' }}
        />
        <input
          type='search'
          placeholder='Buscar por nombre del producto...'
          style={{
            padding: '0.75rem 0.2rem 0.75rem 2.5rem',
            marginBottom: '1rem',
            width: '100%',
            border: 'none',
            borderRadius: '0.3rem',
            outline: 'none',
          }}
          onChange={({ target }) => setSearchText(target.value)}
        />
      </div>
      {products
        .filter((p) => {
          if (!searchText) return true
          return p.name.toLowerCase().includes(searchText.toLowerCase())
        })
        .map((product) => (
          <div key={product._id} className='product-detail-container'>
            <div style={{ width: '50%' }}>
              <img
                src={`https://appturnos.blob.core.windows.net/productos/${
                  product.images[0]
                }?${new Date().getTime()}`}
                alt=''
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  marginRight: '0.7rem',
                  borderRadius: '2.5rem',
                  objectFit: 'contain',
                }}
              />
              <span>{product.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <b style={{ marginRight: '0.5rem' }}>
                <u>Stock </u>:
              </b>
              <span>
                {product.purchases +
                  product.devolutions -
                  product.sales -
                  product.losts}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                width: '33%',
                justifyContent: 'flex-end',
              }}
            >
              <button
                className='btn btn-warning mr-3'
                onClick={() => handleEditProduct(product)}
              >
                <i className='fas fa-edit'></i>
              </button>
              <button
                className='btn btn-info mr-1'
                onClick={() => handleAddProductNovelty(product)}
              >
                <i className='fas fa-shopping-cart'></i>
              </button>
            </div>
          </div>
        ))}
      <ProductNoveltyModal selectedProduct={selectedProduct} />
    </div>
  )
}

export default ProductsList
