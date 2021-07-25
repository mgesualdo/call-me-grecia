import React from 'react'
import { format } from 'date-fns'
import './artistWeek.css'
import ImageAndName from '../../ui/ImageAndName'

const ArtistDay = ({ artistData }) => {
  const { artist, data } = artistData

  console.log({ data })

  return (
    <div className='artist-data-container'>
      <div className='artist-name-container'>
        <ImageAndName name={artist.name} imageName={artist.avatarName} user />
      </div>
      {data.map((d) => (
        <div key={+d.start} className='week-container'>
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
