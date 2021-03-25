import React, { useState } from 'react'
import './icons.css'

const DangerIcon = ({ title, largeToolip = false, showText = true }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleIconClick = () => {
    setShowTooltip(!showTooltip)
  }

  return (
    <div
      className={`my-tooltip-container ${!showText ? 'no-margin' : ''}`}
      onClick={handleIconClick}
    >
      <div className='payment-status'>
        <i className='fas fa-times-circle error-icn' title={title}></i>
        {showText && (
          <span className='payment-status-text error-icn'>Rechazado</span>
        )}
      </div>

      <span
        className={`my-tooltip ${showTooltip && 'show-my-tooltip'} ${
          largeToolip && 'large-tooltip'
        }`}
      >
        {title}
      </span>
    </div>
  )
}

export default DangerIcon
