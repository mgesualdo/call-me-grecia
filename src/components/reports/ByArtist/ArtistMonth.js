import React from 'react'
import { addDays, format, getDay, getMonth, getYear } from 'date-fns'
import './artistWeek.css'
import ImageAndName from '../../ui/ImageAndName'

const ArtistMonth = ({ artistData }) => {
  const { artist, data, artistId } = artistData

  const isCurrentMonth = (start) => {
    let mesHoy = getMonth(new Date()) + 1
    const anoHoy = getYear(new Date())

    if (mesHoy <= 10) {
      mesHoy = `0${mesHoy}`
    }

    return `${mesHoy}-${anoHoy}` === start
  }

  console.log({ artistData })

  return (
    <div className='artist-data-container' key={artistId}>
      <div className='artist-name-container'>
        <ImageAndName name={artist.name} imageName={artist.avatarName} user />
      </div>
      {data.map((d) => (
        <div
          key={d.start}
          className={`week-container ${
            isCurrentMonth(d.start) && 'current-day'
          }`}
        >
          <div>
            <span className='from-time'>{d.start}</span>
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

export default ArtistMonth
