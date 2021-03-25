import React from 'react'

import './uploadImageButton.css'

const UploadImageButton = ({ inputId, icon, handleChange }) => {
  return (
    <label htmlFor={inputId} className='user-image-label'>
      <input
        type='file'
        name={inputId}
        id={inputId}
        onChange={handleChange}
        accept='image/*'
      />
      <i className={icon}></i>
      <span className='choose-image'> Elegir una imagen</span>
    </label>
  )
}

export default UploadImageButton
