import React from 'react'
import { addDays, format, getDay } from 'date-fns'
import './artistWeek.css'
import ImageAndName from '../../ui/ImageAndName'
import { useHistory } from 'react-router'

const ArtistDay = ({ artistData }) => {
  const { artist, data } = artistData

  const history = useHistory()

  const isCurrentDay = (start) => {
    const hoy = format(new Date(), 'yy-MM-dd')
    const dia = format(start, 'yy-MM-dd')
    const esDomingo = getDay(new Date()) === 0
    const esLunes = getDay(new Date()) === 0

    if (esDomingo) return format(addDays(start, 1), 'yy-MM-dd') === hoy
    if (esLunes) return format(addDays(start, 2), 'yy-MM-dd') === hoy

    return dia === hoy
  }

  const handleClick = (start) => {
    const formattedDate = format(start, 'yyyy-MM-dd')
    history.push(`/users/appointments/${formattedDate}`)
  }

  return (
    <div className='artist-data-container'>
      <div className='artist-name-container'>
        <ImageAndName name={artist.name} imageName={artist.avatarName} user />
      </div>
      {data.map((d) => (
        <div
          key={+d.start}
          className={`day week-container ${
            isCurrentDay(d.start) && 'current-day'
          }`}
          onClick={() => handleClick(d.start)}
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
