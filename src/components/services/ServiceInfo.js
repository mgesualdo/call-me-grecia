import React from 'react'

import './serviceInfo.css'

const ServiceInfo = ({ service }) => {
  const baseUrl = 'https://appturnos.blob.core.windows.net/servicios/'

  const howManyImages = service.images.length

  console.log({ howManyImages })

  return (
    <div>
      <h3 className='service-title'>Descripción</h3>
      <p>{service.description}</p>
      <div className='service-images-container'>
        {service.images.map((imageUrl) => (
          <div
            style={{
              boxShadow: '0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.3)',
              background: 'transparent',
              borderRadius: '1rem',
            }}
            key={imageUrl}
          >
            <img
              src={baseUrl + imageUrl}
              alt='Previsualización de la imagen'
              style={{
                width: `${28 / howManyImages}rem`,
                height: `${28 / howManyImages}rem`,
                display: `${'block'}`,
                textAlign: 'center',

                borderRadius: '1rem',
                objectFit: 'cover',
                overflow: 'hidden',
                transition: 'all 1s ease',
                cursor: 'pointer',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceInfo
