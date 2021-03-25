import React from 'react'

import './imageAndName.css'

const ImageAndName = ({
  name,
  client = false,
  user,
  imageName,
  smallImage,
  bold,
  color,
}) => {
  let folderName = client ? 'clientes' : user ? 'usuarios' : 'servicios'

  const imageUrl = `https://appturnos.blob.core.windows.net/${folderName}/${
    imageName ? imageName : 'no-user.png'
  }`

  return (
    <div className={`img-and-name-container ${smallImage && 'small-image'}`}>
      <img src={imageUrl} alt='Imagen del profesional' placeholder={name} />
      <h5 style={{ fontWeight: `${bold ? 'bolder' : 'normal'}`, color }}>
        {name}
      </h5>
    </div>
  )
}

export default ImageAndName
