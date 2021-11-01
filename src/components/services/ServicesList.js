import React from 'react'
import { useSelector } from 'react-redux'
import { emptyService } from '../../utils/constants'
import './servicesList.css'

const ServicesList = ({
  setAddingService,
  previewImageUrls,
  setAvatarFiles,
  setPreviewImageUrls,
  setNewService,
}) => {
  const { services } = useSelector((state) => state.service)

  const handleAddService = () => {
    setAddingService(true)
    setNewService(emptyService)
    setPreviewImageUrls([])
    setAvatarFiles([])
  }
  const handleEditService = ({
    _id,
    name,
    duration,
    reservationCost,
    description,
    images,
  }) => {
    setAddingService(false)
    console.log('LA PUTA QUE TE PARIO!!')
    setNewService({
      _id,
      name,
      duration,
      reservationCost,
      description,
      images,
    })
    let newPreviewImageUrls = []
    images.map((imageName, index) => {
      newPreviewImageUrls[
        index
      ] = `https://appturnos.blob.core.windows.net/servicios/${imageName}?${new Date().getTime()}`
    })
    setPreviewImageUrls(newPreviewImageUrls)
    setAvatarFiles([])
  }

  return (
    <div className='services-container'>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='btn btn-primary button-add-on-list'
          style={{
            width: '170px',
            marginBottom: '1rem',
            backgroundColor: '#dabcb2',
            color: 'black',
            border: 'none',
            fontWeight: 'bold',
          }}
          onClick={handleAddService}
        >
          <i className='fas fa-plus mr-2'></i>
          Agregar servicio
        </button>
      </div>
      {services.map((service) => (
        <div key={service._id} className='service-detail-container'>
          <div style={{ width: '50%' }}>
            <img
              src={`https://appturnos.blob.core.windows.net/servicios/${
                service.images[0]
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
            <span>{service.name}</span>
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
              onClick={() => handleEditService(service)}
            >
              <i className='fas fa-edit'></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServicesList
