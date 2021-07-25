import React, { useEffect, useState } from 'react'
import { UserNavbar } from '../ui/UserNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentsPerArtist } from '../../actions/report'
import ArtistWeek from './ByArtist/ArtistWeek'

import { addDays } from 'date-fns'
import ArtistDay from './ByArtist/ArtistDay'

const ReportsScreen = () => {
  const [verSemana, setVerSemana] = useState(false)
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
            backgroundColor: '#dabcb2',
            marginTop: '2rem',
            outline: 'none',
          }}
          onClick={() => setVerSemana(!verSemana)}
        >
          Ver {verSemana ? 'día' : 'semana'}
        </button>
      </div>
      {verSemana &&
        appointmentsGrouppedByArtist?.map((artistData) => (
          <>
            <ArtistWeek artistData={artistData} key={artistData.artistId} />
          </>
        ))}
      {!verSemana &&
        appointmentsGrouppedByArtistDaily?.map((artistData) => (
          <>
            <ArtistDay artistData={artistData} key={artistData.artistId} />
          </>
        ))}
    </>
  )
}

export default ReportsScreen
