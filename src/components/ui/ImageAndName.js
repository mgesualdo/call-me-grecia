import React from 'react'

import './imageAndName.css'

const ImageAndName = ({
  name,
  client = false,
  user,
  product = false,
  imageName,
  smallImage,
  bold,
  color,
  eventDuration,
}) => {
  let folderName = client ? 'clientes' : user ? 'usuarios' : 'servicios'

  let imageUrl = `https://appturnos.blob.core.windows.net/${folderName}/${
    imageName ? imageName : 'no-user.png'
  }`

  if (product) {
    imageUrl = `https://appturnos.blob.core.windows.net/productos/${imageName}`
  }

  return (
    <div className={`img-and-name-container ${smallImage && 'small-image'}`}>
      <img src={imageUrl} alt='Imagen del profesional' placeholder={name} />
      <h5
        style={{ fontWeight: `${bold ? 'bolder' : 'normal'}`, color }}
        className={`${eventDuration <= 30 && !client && 'cut-words'} ${
          eventDuration >= 45 && 'cut-words-less'
        }`}
      >
        {name}
      </h5>
    </div>
  )
}

export default ImageAndName
