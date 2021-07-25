import React from 'react'
import { addDays, format, getDay } from 'date-fns'
import './artistWeek.css'
import ImageAndName from '../../ui/ImageAndName'

const ArtistDay = ({ artistData }) => {
  const { artist, data } = artistData

  const isCurrentDay = (start) => {
    const hoy = format(new Date(), 'yy-MM-dd')
    const dia = format(start, 'yy-MM-dd')
    const diaSiguiente = format(addDays(start, 1), 'yy-MM-dd')
    const esDomingo = getDay(new Date()) === 0

    if (esDomingo) return diaSiguiente === hoy

    return dia === hoy
  }

  return (
    <div className='artist-data-container'>
      <div className='artist-name-container'>
        <ImageAndName name={artist.name} imageName={artist.avatarName} user />
      </div>
      {data.map((d) => (
        <div
          key={+d.start}
          className={`week-container ${isCurrentDay(d.start) && 'current-day'}`}
        >
          <div>
            <span className='from-time'>{format(d.start, 'dd/MM/yyyy')}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bolder', color: '#1a8' }}>
              {' '}
              ${d.gathered}
            </span>{' '}
            /
            <span style={{ fontWeight: 'bolder', color: '#333' }}>
              {' '}
              ${d.salesAmount}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArtistDay
