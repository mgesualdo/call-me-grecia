import React from 'react'
import './input.css'

const Input = ({
  type,
  placeholder,
  name,
  value,
  handleChange,
  regexp,
  minLength = 0,
  required,
  id,
}) => {
  return (
    <div className='input-container'>
      {type === 'text-area' ? (
        <textarea
          type={type}
          placeholder={placeholder}
          className='input-style'
          name={name}
          rows='7'
          value={value}
          onChange={handleChange}
          required={required}
          id={id}
        />
      ) : (
        <>
          {type === 'email' && <i className='far fa-envelope input-icn'></i>}
          {type === 'number' &&
            (name === 'reservationCost' || name === 'paymentAmount') && (
              <i className='fas fa-dollar-sign input-icn tel'></i>
            )}
          {type === 'number' && name === 'duration' && (
            <i className='far fa-clock input-icn'></i>
          )}
          {type === 'password' && <i className='fas fa-key input-icn'></i>}
          {type === 'tel' && (
            <i className='fas fa-mobile-alt input-icn tel'></i>
          )}
          {(name === 'name' || name === 'lastname') && (
            <i className='far fa-id-card input-icn'></i>
          )}
          <input
            type={type}
            className='input-style'
            placeholder={placeholder}
            name={name}
            pattern={regexp}
            minLength={minLength}
            value={value}
            onChange={handleChange}
            onBlur={handleChange}
            onFocus={handleChange}
            required={required}
            id={id}
          />
        </>
      )}
    </div>
  )
}

export default Input
