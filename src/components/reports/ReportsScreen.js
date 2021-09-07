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
  const { loggedUser } = useSelector((state) => state.auth)
  console.log({ appointmentsPerArtist })
  const appointmentsGrouppedByArtist = appointmentsPerArtist.weeklyAppointments
    ?.filter((app) => {
      if (loggedUser.roles.includes('ADMIN')) return !app.artist.deleted
      return !app.artist.deleted && app.artist._id === loggedUser._id
    })
    .reduce(
      (accumulator, currentValue, index) => {
        console.log({ currentWeekValue: currentValue })
        const currentArtistId = currentValue.artist._id
        const salesAmount = currentValue.salesAmount
        const gathered = currentValue.gathered
        const gatheredReservationsWithoutAssistance =
          currentValue.gatheredReservationsWithoutAssistance
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
                gatheredReservationsWithoutAssistance,
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
            gatheredReservationsWithoutAssistance,
          })
        }
        return accumulator
      },
      [{ artistId: '', artist: {}, data: [] }]
    )

  const appointmentsGrouppedByArtistDaily =
    appointmentsPerArtist.dailyAppointments
      ?.filter((app) => {
        if (loggedUser.roles.includes('ADMIN')) return !app.artist.deleted
        return !app.artist.deleted && app.artist._id === loggedUser._id
      })
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
      ?.filter((app) => {
        if (loggedUser.roles.includes('ADMIN')) return !app.artist.deleted
        return !app.artist.deleted && app.artist._id === loggedUser._id
      })
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
            width: '8rem',
            fontWeight: 'bold',
          }}
          onClick={() => setFrecuencia('dia')}
        >
          Diario
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
            width: '8rem',
            fontWeight: 'bold',
          }}
          onClick={() => setFrecuencia('semana')}
        >
          Semanal
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
            width: '8rem',
            fontWeight: 'bold',
          }}
          onClick={() => setFrecuencia('mes')}
        >
          Mensual
        </button>
      </div>

      {!appointmentsGrouppedByArtistDaily && (
        <div style={{ marginTop: '5rem' }}>
          <Spinner />
        </div>
      )}
      <div style={{ paddingBottom: frecuencia === 'dia' && '6rem' }}>
        {frecuencia === 'dia' &&
          appointmentsGrouppedByArtistDaily?.map((artistData) => (
            <ArtistDay artistData={artistData} key={artistData.artistId} />
          ))}
      </div>
      <div style={{ paddingBottom: frecuencia === 'semana' && '6rem' }}>
        {frecuencia === 'semana' &&
          appointmentsGrouppedByArtist?.map((artistData) => (
            <ArtistWeek artistData={artistData} key={artistData.artistId} />
          ))}
      </div>
      <div style={{ paddingBottom: frecuencia === 'mes' && '6rem' }}>
        {frecuencia === 'mes' &&
          appointmentsGrouppedByArtistMonthly?.map((artistData) => (
            <ArtistMonth artistData={artistData} key={artistData.artistId} />
          ))}
      </div>
    </>
  )
}

export default ReportsScreen
