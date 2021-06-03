import React from 'react'
import './whatsappFab.css'

export const InstagramFab = () => {
  const handleGo = () => {
    window.location.href = `https://instagram.com/callmegrecia?igshid=14zzpr887afvr`
  }

  return (
    <div className='fab-instagram' onClick={handleGo}>
      <img src='/img/ig.jpg' alt='' className='instagram' />
    </div>
  )
}
