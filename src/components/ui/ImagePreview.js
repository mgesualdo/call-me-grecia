import React from 'react'

const ImagePreview = ({
  previewImageUrls,
  avatarFiles,
  size = '11',
  relatedButtonId,
  setAvatarFiles,
  setPreviewImageUrls,
  imageIndex,
}) => {
  const handleImageClick = () => {
    const button = document.getElementById(relatedButtonId)
    button.click()
  }

  const handleContainerImageClick = () => {
    let buttonImageId = imageIndex + 1
    const button = document.getElementById('service-' + buttonImageId)
    !previewImageUrls && button.click()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.items[0].getAsFile()
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        let newPreviewImageUrls = [...previewImageUrls]
        newPreviewImageUrls[imageIndex] = reader.result
        setPreviewImageUrls(newPreviewImageUrls)
        let newAvatarFiles = [...avatarFiles]
        file.imageIndex = imageIndex
        newAvatarFiles[imageIndex] = { file, name: file.name }
        setAvatarFiles(newAvatarFiles)
      }
    }

    file && reader.readAsDataURL(file)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  let imagePreview =
    previewImageUrls[imageIndex] === undefined
      ? '/img/no-image.png'
      : previewImageUrls[imageIndex]

  return (
    <div
      className='d-flex justify-content-center'
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        borderRadius: `${imageIndex === 0 ? size : size / 4}rem`,
        border: `2px dashed ${
          !previewImageUrls[imageIndex] ? '#777' : '#1177dd'
        } `,
        marginTop: '1.2rem',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={handleContainerImageClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img
        src={imagePreview}
        alt='Previsualización de la imagen'
        style={{
          width: `${size * 0.9}rem`,
          display: `${'block'}`,
          textAlign: 'center',
          objectFit: 'cover',
          transition: 'all 3s ease',
          cursor: 'pointer',
        }}
        onClick={handleImageClick}
      />
    </div>
  )
}

export default ImagePreview
