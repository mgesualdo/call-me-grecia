import React from 'react'

import { useSelector } from 'react-redux'

const ProductList = ({ productValue, handleInputChange, isUser }) => {
  const { selectedUser, loggedUser } = useSelector((state) => state.auth)

  const user = isUser ? loggedUser : selectedUser

  return (
    <>
      <select
        name='product'
        value={productValue}
        onChange={handleInputChange}
        className='form-control'
      >
        <option value=''></option>
        {user.products.map(({ product }) => (
          <option value={product._id} key={product._id}>
            {product.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default ProductList
