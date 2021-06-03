import React from 'react'
import { useState } from 'react'

import './serviceInfo.css'

const ServiceInfo = ({ service }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null)
  const [isImageSelected, setIsImageSelected] = useState(false)
  const baseUrl = 'https://appturnos.blob.core.windows.net/servicios/'

  const howManyImages = service.images.length
  const imageSize = howManyImages > 2 ? 25 / howManyImages : 8

  const handleImageClick = (imageUrl) => {
    if (imageUrl === selectedImageUrl) {
      setIsImageSelected(false)
      setTimeout(() => {
        setSelectedImageUrl(null)
      }, 300)
      return
    }
    setIsImageSelected(true)
    setSelectedImageUrl(imageUrl)
  }

  return (
    <div>
      <h3 className='service-title'>Descripción</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{service.description}</p>
      <div className='service-images-container'>
        {service.images.map((imageUrl, index) => (
          <div
            style={{
              boxShadow: '0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.3)',
              background: 'transparent',
              borderRadius: '1rem',
            }}
            key={imageUrl}
            onClick={() => handleImageClick(imageUrl)}
          >
            <img
              src={baseUrl + imageUrl}
              alt='Previsualización de la imagen'
              style={{
                width: `${imageSize}rem`,
                height: `${imageSize}rem`,
                display: `${'block'}`,
                textAlign: 'center',

                borderRadius: '1rem',
                objectFit: 'cover',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
              }}
              className='service-image-info'
            />
          </div>
        ))}
        <div
          style={{
            boxShadow: '0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.3)',
            background: 'transparent',
            borderRadius: '1rem',
          }}
          onClick={() => handleImageClick(selectedImageUrl)}
        >
          <img
            src={baseUrl + selectedImageUrl}
            style={{
              textAlign: 'center',
              borderRadius: '1rem',
              objectFit: 'cover',
              overflow: 'hidden',
              transition: 'all 1s ease',
              cursor: 'pointer',
              zIndex: 2,
            }}
            className={`${isImageSelected && 'visible'} selected-image`}
          />
        </div>
      </div>
    </div>
  )
}

export default ServiceInfo
