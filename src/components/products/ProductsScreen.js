import React, { useState } from 'react'
import { UserNavbar } from '../ui/UserNavbar'
import ProductsForm from './ProductsForm'
import ProductsList from './ProductsList'

import { emptyProduct } from '../../utils/constants'

import './ProductsScreen.css'

const ProductsScreen = () => {
  const [newProduct, setNewProduct] = useState(emptyProduct)
  const [addingProduct, setAddingProduct] = useState(true)
  const [avatarFiles, setAvatarFiles] = useState([])
  const [previewImageUrls, setPreviewImageUrls] = useState([])

  console.log({ newProduct })

  return (
    <div>
      <UserNavbar />
      <div className='products-screen-container'>
        <ProductsForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          addingProduct={addingProduct}
          avatarFiles={avatarFiles}
          setAvatarFiles={setAvatarFiles}
          previewImageUrls={previewImageUrls}
          setPreviewImageUrls={setPreviewImageUrls}
        />

        <ProductsList
          setAddingProduct={setAddingProduct}
          setAvatarFiles={setAvatarFiles}
          previewImageUrls={previewImageUrls}
          setPreviewImageUrls={setPreviewImageUrls}
          setNewProduct={setNewProduct}
        />
      </div>
    </div>
  )
}

export default ProductsScreen
