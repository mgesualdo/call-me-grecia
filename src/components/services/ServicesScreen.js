import React, { useState } from 'react'
import { UserNavbar } from '../ui/UserNavbar'
import ServicesForm from './ServicesForm'
import ServicesList from './ServicesList'

import { emptyService } from '../../utils/constants'

import './ServicesScreen.css'

const ServicesScreen = () => {
  const [newService, setNewService] = useState(emptyService)
  const [addingService, setAddingService] = useState(true)
  const [avatarFiles, setAvatarFiles] = useState([])
  const [previewImageUrls, setPreviewImageUrls] = useState([])

  return (
    <div>
      <UserNavbar />
      <div className='services-screen-container'>
        <ServicesForm
          newService={newService}
          setNewService={setNewService}
          addingService={addingService}
          avatarFiles={avatarFiles}
          setAvatarFiles={setAvatarFiles}
          previewImageUrls={previewImageUrls}
          setPreviewImageUrls={setPreviewImageUrls}
        />

        <ServicesList
          setAddingService={setAddingService}
          setAvatarFiles={setAvatarFiles}
          previewImageUrls={previewImageUrls}
          setPreviewImageUrls={setPreviewImageUrls}
          setNewService={setNewService}
        />
      </div>
    </div>
  )
}

export default ServicesScreen
