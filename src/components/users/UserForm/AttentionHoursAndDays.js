import React from 'react'
import { week } from '../../../utils/constants'

import './attentionHoursAndDays.css'

const AttentionHoursAndDays = ({ workWeek, handleChange }) => {
  return (
    <div className='mt-4'>
      <h4>Días y horarios de atención</h4>
      <div className='d-flex justify-content-center mt-3 attention-hours'>
        {week.map(({ day, dayShort, hours }, dayIndex) => (
          <div className='form-check day-container' key={day}>
            <h4 className='mb-2 text-center'>{dayShort}</h4>
            {hours.map((hour) => (
              <div key={hour} className='work-week-hour-container'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  onChange={() => null}
                  value={hour}
                  id={hour}
                  checked={workWeek[dayIndex]?.hours?.includes(hour)}
                />
                <label
                  onClick={() => handleChange(hour, dayIndex)}
                  htmlFor={hour}
                  className='work-week-hour'
                >
                  {hour}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AttentionHoursAndDays
