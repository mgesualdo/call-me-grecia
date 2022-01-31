import React from 'react'

const Product = ({ name, description, price }) => {
  return (
    <div className='product-container p-3 d-flex flex-column justify-content-between '>
      <h3 className='text-center product-name'>{name}</h3>
      <p className='pt-3 text-center product-text '>{description}</p>
      <h3 className='text-center price text-primary'>${price}</h3>
    </div>
  )
}

export default Product
