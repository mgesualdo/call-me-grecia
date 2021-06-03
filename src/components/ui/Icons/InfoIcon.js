import React from 'react'

const InfoIcon = ({ title }) => {
  return (
    <div className='my-tooltip-container'>
      <div className='payment-status'>
        <i className='fas fa-exclamation-circle info-icn' title={title}></i>
        <span className='info-icn'>Devuelto</span>
      </div>
    </div>
  )
}
export default InfoIcon
