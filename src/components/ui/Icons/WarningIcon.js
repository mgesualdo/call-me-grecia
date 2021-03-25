import React, { useState } from 'react'
import './icons.css'

const WarningIcon = ({ title }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleIconClick = () => {
    setShowTooltip(!showTooltip)
  }

  return (
    <div className='my-tooltip-container' onClick={handleIconClick}>
      <div className='payment-status'>
        <i className='fas fa-exclamation-circle info-icn' title={title}></i>
        <span className='payment-status-text info-icn'>Pendiente</span>
      </div>
      <span className={`my-tooltip ${showTooltip && 'show-my-tooltip'}`}>
        {title}
      </span>
    </div>
  )
}

export default WarningIcon
