import React from 'react'
import './spinner.css'

const Spinner = ({
  bigg = false,
  small = false,
  smallest = false,
  changeColor = false,
}) => {
  return (
    <div
      className={`${bigg ? 'bigg-loader' : ''} ${small ? 'small-loader' : ''} ${
        smallest ? 'smallest-loader' : ''
      } loader ${changeColor ? 'change-color' : ''}`}
    >
      Loading...
    </div>
  )
}

export default Spinner
