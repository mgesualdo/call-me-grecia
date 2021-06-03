import React from 'react'
import { format } from 'date-fns'
import './artistWeek.css'
import ImageAndName from '../../ui/ImageAndName'

const ArtistWeek = ({ artistData }) => {
  const { artist, data } = artistData

  console.log({ data })

  return (
    <div className='artist-data-container'>
      <div className='artist-name-container'>
        <ImageAndName name={artist.name} imageName={artist.avatarName} user />
      </div>
      {data.map((w) => (
        <div key={+w.weekEnd} className='week-container'>
          <div>
            <span>Semana del </span>
            <span className='from-time'>
              {format(w.weekStart, 'dd/MM/yyyy')}
            </span>
            <span> al </span>
            <span className='to-time'>
              {format(w.weekEnd, 'dd/MM/yyyy')}
            </span>{' '}
          </div>
          <div>
            <span style={{ fontWeight: 'bolder', color: '#1a8' }}>
              {' '}
              ${w.gathered}
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
