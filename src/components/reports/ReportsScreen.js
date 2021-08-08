import React, { useEffect, useState } from 'react'
import { UserNavbar } from '../ui/UserNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentsPerArtist } from '../../actions/report'
import ArtistWeek from './ByArtist/ArtistWeek'

import { addDays } from 'date-fns'
import ArtistDay from './ByArtist/ArtistDay'
import ArtistMonth from './ByArtist/ArtistMonth'
import Spinner from '../ui/Spinner'

const ReportsScreen = () => {
  const [frecuencia, setFrecuencia] = useState('dia')
  const { appointmentsPerArtist } = useSelector((state) => state.report)
  console.log({ appointmentsPerArtist })
  const appointmentsGrouppedByArtist = appointmentsPerArtist.weeklyAppointments
    ?.filter((app) => app.artist.deleted === false)
    .reduce(
      (accumulator, currentValue, index) => {
        const currentArtistId = currentValue.artist._id
        const salesAmount = currentValue.salesAmount
        const gathered = currentValue.gathered
        const weekEnd = addDays(new Date(currentValue._id.weekEnd), 1)
        const isArtistAlready = accumulator.some(
          (u) => u.artistId === currentArtistId
        )
        const newArtistIndex = index === 0 ? 0 : accumulator.length

        if (!isArtistAlready) {
          accumulator[newArtistIndex] = {
            artistId: currentValue.artist._id,
            artist: currentValue.artist,
            data: [
              {
                weekStart: addDays(weekEnd, -5),
                weekEnd,
                salesAmount,
                gathered,
              },
            ],
          }
        } else {
          const artistIndex = accumulator.findIndex(
            (u) => u.artistId === currentArtistId
          )
          accumulator[artistIndex].data.push({
            weekStart: addDays(weekEnd, -5),
            weekEnd,
            salesAmount,
            gathered,
          })
        }
        return accumulator
      },
      [{ artistId: '', artist: {}, data: [] }]
    )

  const appointmentsGrouppedByArtistDaily =
    appointmentsPerArtist.dailyAppointments
      ?.filter((app) => app.artist.deleted === false)
      .reduce(
        (accumulator, currentValue, index) => {
          const currentArtistId = currentValue.artist._id
          const salesAmount = currentValue.salesAmount
          const gathered = currentValue.gathered
          const day = addDays(new Date(currentValue._id.start), 1)
          const isArtistAlready = accumulator.some(
            (u) => u.artistId === currentArtistId
          )
          const newArtistIndex = index === 0 ? 0 : accumulator.length

          if (!isArtistAlready) {
            accumulator[newArtistIndex] = {
              artistId: currentValue.artist._id,
              artist: currentValue.artist,
              data: [
                {
                  start: day,
                  salesAmount,
                  gathered,
                },
              ],
            }
          } else {
            const artistIndex = accumulator.findIndex(
              (u) => u.artistId === currentArtistId
            )
            accumulator[artistIndex].data.push({
              start: day,
              salesAmount,
              gathered,
            })
          }
          return accumulator
        },
        [{ artistId: '', artist: {}, data: [] }]
      )

  const appointmentsGrouppedByArtistMonthly =
    appointmentsPerArtist.monthlyAppointments
      ?.filter((app) => app.artist.deleted === false)
      .reduce(
        (accumulator, currentValue, index) => {
          console.log({ currentValue })
          const currentArtistId = currentValue.artist._id
          const salesAmount = currentValue.salesAmount
          const gathered = currentValue.gathered
          const isArtistAlready = accumulator.some(
            (u) => u.artistId === currentArtistId
          )
          const newArtistIndex = index === 0 ? 0 : accumulator.length

          if (!isArtistAlready) {
            accumulator[newArtistIndex] = {
              artistId: currentValue.artist._id,
              artist: currentValue.artist,
              data: [
                {
                  start: currentValue._id.start,
                  salesAmount,
                  gathered,
                },
              ],
            }
          } else {
            const artistIndex = accumulator.findIndex(
              (u) => u.artistId === currentArtistId
            )
            accumulator[artistIndex].data.push({
              start: currentValue._id.start,
              salesAmount,
              gathered,
            })
          }
          return accumulator
        },
        [{ artistId: '', artist: {}, data: [] }]
      )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAppointmentsPerArtist())
  }, [])

  return (
    <>
      <UserNavbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <button
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.5rem',
            borderRadius: '1rem',
            borderStyle: 'none',
            backgroundColor: frecuencia === 'dia' ? '#da9078' : '#dabcb2',
            marginTop: '2rem',
            outline: 'none',
          }}
          onClick={() => setFrecuencia('dia')}
        >
          Ver por día
        </button>
        <button
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.5rem',
            borderRadius: '1rem',
            borderStyle: 'none',
            backgroundColor: frecuencia === 'semana' ? '#da9078' : '#dabcb2',
            marginTop: '2rem',
            marginLeft: '1rem',
            outline: 'none',
          }}
          onClick={() => setFrecuencia('semana')}
        >
          Ver por semana
        </button>
        <button
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.5rem',
            borderRadius: '1rem',
            borderStyle: 'none',
            backgroundColor: frecuencia === 'mes' ? '#da9078' : '#dabcb2',
            marginTop: '2rem',
            marginLeft: '1rem',
            outline: 'none',
          }}
          onClick={() => setFrecuencia('mes')}
        >
          Ver por mes
        </button>
      </div>

      {!appointmentsGrouppedByArtistDaily && (
        <div style={{ marginTop: '5rem' }}>
          <Spinner />
        </div>
      )}
      {frecuencia === 'dia' &&
        appointmentsGrouppedByArtistDaily?.map((artistData) => (
          <>
            <ArtistDay artistData={artistData} key={artistData.artistId} />
          </>
        ))}
      {frecuencia === 'semana' &&
        appointmentsGrouppedByArtist?.map((artistData) => (
          <>
            <ArtistWeek artistData={artistData} key={artistData.artistId} />
          </>
        ))}
      {frecuencia === 'mes' &&
        appointmentsGrouppedByArtistMonthly?.map((artistData) => (
          <>
            <ArtistMonth artistData={artistData} key={artistData.artistId} />
          </>
        ))}
    </>
  )
}

export default ReportsScreen
