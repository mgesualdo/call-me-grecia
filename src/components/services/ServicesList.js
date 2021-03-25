import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteService } from '../../actions/services'
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
  const dispatch = useDispatch()

  const handleDeleteService = (serviceId) => dispatch(deleteService(serviceId))
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
    const serviceNameInput = document.getElementById('service-name')
    serviceNameInput.focus()
  }

  return (
    <div className='services-container'>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='btn btn-primary'
          style={{ width: '170px', marginBottom: '1rem' }}
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
            <button
              className='btn btn-danger'
              onClick={() => handleDeleteService(service._id)}
            >
              <i className='fas fa-trash'></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServicesList
