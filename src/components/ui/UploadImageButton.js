import React from 'react'

import './uploadImageButton.css'

const UploadImageButton = ({
  inputId,
  icon,
  handleChange,
  show = true,
  multiple = false,
}) => {
  return (
    <label
      htmlFor={inputId}
      className='user-image-label'
      style={{ display: `${!show ? 'none' : 'normal'}` }}
    >
      <input
        type='file'
        name={inputId}
        id={inputId}
        onChange={handleChange}
        accept='image/*'
        multiple={multiple}
      />
      <i className={icon}></i>
      <span className='choose-image'> Elegir una imagen</span>
    </label>
  )
}

export default UploadImageButton
