import React from 'react'

const SuccessIcon = ({ title }) => {
  return (
    <div className='my-tooltip-container'>
      <div className='payment-status'>
        <i className='fas fa-check-circle success-icn' title={title}></i>
        <span className='success-icn'>Aprobado</span>
      </div>
    </div>
  )
}
export default SuccessIcon
