import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { fetchSinToken } from '../../helpers/fetch'
import { emptyProduct } from '../../utils/constants'
import Spinner from '../ui/Spinner'
import { ProductNoveltyModal } from './ProductNoveltyModal'
import './productsList.css'

const baseUrl = process.env.REACT_APP_API_URL

const ProductsList = ({
  setAddingProduct,
  setAvatarFiles,
  setPreviewImageUrls,
  setNewProduct,
}) => {
  const { products } = useSelector((state) => state.product)
  const [selectedProduct, setSelectedProduct] = useState()
  const [selectedNovelty, setSelectedNovelty] = useState()
  const [searchText, setSearchText] = useState()
  const [loading, setLoading] = useState()
  const [novelties, setNovelties] = useState()

  const handleAddProduct = () => {
    setAddingProduct(true)
    setNewProduct(emptyProduct)
    setPreviewImageUrls([])
    setAvatarFiles([])
  }

  console.log({ searchText })

  const dispatch = useDispatch()

  const handleEditProduct = async ({
    _id,
    name,
    price,
    description,
    images,
  }) => {
    setAddingProduct(false)
    console.log('LA PUTA QUE TE PARIO!!')
    setSelectedProduct({ _id, name, price, description, images })
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
    const url = `product/novelty/${_id}`
    setLoading(true)
    const res = await fetchSinToken(url)
    const body = await res.json()
    setLoading(false)
    if (body.ok) {
      setNovelties(body.data)
    }
  }

  const handleAddProductNovelty = (product) => {
    dispatch(uiOpenModal())
    setSelectedNovelty(null)
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            {loading && selectedProduct?._id === product._id && (
              <Spinner changeColor />
            )}
            {selectedProduct?._id === product._id && novelties?.length > 0 && (
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>
                  <u>Últimas novedades</u>
                </h4>
                {novelties?.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => {
                      setSelectedNovelty(n)
                      setSelectedProduct(product)
                      dispatch(uiOpenModal())
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      backgroundColor: 'white',
                      borderRadius: '0.3rem',
                      padding: '0.5rem',
                      width: '100%',
                      cursor: 'pointer',
                      marginBottom: '1rem',
                      boxShadow: '0 0 5px 2px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        borderRadius: '0.3rem',
                        width: '100%',
                      }}
                    >
                      <span>
                        <b>{n.type}</b>
                      </span>
                      <span>{n.quantity}</span>
                      <span>${n.unitPrice}</span>
                    </div>
                    {n?.details && (
                      <div style={{ width: '100%', marginTop: '0.5rem' }}>
                        <p style={{ margin: '0' }}>
                          <u>Detalle</u>:
                        </p>
                        <span>{n.details}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      <ProductNoveltyModal
        selectedProduct={selectedProduct}
        selectedNovelty={selectedNovelty}
        setNovelties={setNovelties}
      />
    </div>
  )
}

export default ProductsList
