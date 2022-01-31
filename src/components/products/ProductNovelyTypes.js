import React from 'react'
import './productNoveltyTypes.css'

const ProductNovelyTypes = ({ acceptedTypes, selectedType, handleSelect }) => {
  return (
    <div className='roles-container'>
      <div className='roles-input-container'>
        {acceptedTypes.map((kind) => (
          <div className='form-check roles-input-container' key={kind}>
            <div>
              <input
                className='form-check-input'
                name='payment-kind'
                type='checkbox'
                onChange={() => null}
                value={kind}
                id={kind}
                checked={kind === selectedType}
              />
              <label
                onClick={() => handleSelect(kind)}
                className='form-check-label'
                name='payment-kind'
                htmlFor={kind}
              >
                {kind}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductNovelyTypes
