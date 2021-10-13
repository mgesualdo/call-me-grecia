import React from 'react'
import { format, addDays } from 'date-fns'
import './artistWeek.css'
import ImageAndName from '../../ui/ImageAndName'

const ArtistWeek = ({ artistData }) => {
  const { artist, data } = artistData

  const isCurrentWeek = (start, end) => {
    const hoy = new Date()
    const domingo = addDays(end, 1)

    return hoy >= start && hoy <= domingo
  }

  return (
    <div className={`artist-data-container`}>
      <div className='artist-name-container'>
        <ImageAndName name={artist.name} imageName={artist.avatarName} user />
      </div>
      {data.map((w) => (
        <div
          key={+w.weekEnd}
          className={`week-container ${
            isCurrentWeek(w.weekStart, w.weekEnd) && 'current-period'
          }`}
          onClick={() => isCurrentWeek(w.weekStart, w.weekEnd)}
        >
          <div>
            <span className='from-time'>
              {format(w.weekStart, 'dd/MM/yyyy')}
            </span>
            <span> al </span>
            <span className='to-time'>
              {format(w.weekEnd, 'dd/MM/yyyy')}
            </span>{' '}
          </div>
          <div
            style={{ paddingLeft: '1.1rem', textAlign: 'left', width: '5rem' }}
          >
            {!artist.roles.includes('ADMIN') && (
              <b>
                ${(w.gathered - w.gatheredReservationsWithoutAssistance) * 0.5}
              </b>
            )}
          </div>
          <div style={{ textAlign: 'right', width: '10rem' }}>
            <span style={{ fontWeight: 'bolder', color: '#1a8' }}>
              {' '}
              $
              {artist.roles.includes('ADMIN')
                ? w.gathered
                : w.gathered - w.gatheredReservationsWithoutAssistance}
            </span>{' '}
            /
            <span style={{ fontWeight: 'bolder', color: '#333' }}>
              {' '}
              ${w.salesAmount}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArtistWeek
