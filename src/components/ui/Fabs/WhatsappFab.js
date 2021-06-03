import React from 'react'
import './whatsappFab.css'

export const WhatsappFab = () => {
  const handleAdd = () => {
    let cel = '+5491173636676'
    let text = 'Hola Grecia, quería hacerte una consulta!'
    window.location.href = `https://wa.me/${cel}?text=${text}`
  }

  return (
    <div className='fab-whatsapp' onClick={handleAdd}>
      <img src='/img/wsp.png' alt='' className='whatsapp' />
    </div>
  )
}
