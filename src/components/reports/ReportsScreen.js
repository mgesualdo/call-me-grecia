import React, { useEffect } from 'react'
import { UserNavbar } from '../ui/UserNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentsPerArtist } from '../../actions/report'
import ArtistWeek from './ByArtist/ArtistWeek'

import { addDays } from 'date-fns'

const ReportsScreen = () => {
  const { appointmentsPerArtist } = useSelector((state) => state.report)

  const appointmentsGrouppedByArtist = appointmentsPerArtist.reduce(
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
            { weekStart: addDays(weekEnd, -5), weekEnd, salesAmount, gathered },
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
  console.log({ appointmentsPerArtist, appointmentsGrouppedByArtist })

  const dispatch = useDispatch()

  useEffect(() => {}, [])

  useEffect(() => {
    dispatch(getAppointmentsPerArtist())
  }, [])

  return (
    <>
      <UserNavbar />
      {appointmentsGrouppedByArtist.map((artistData) => (
        <ArtistWeek artistData={artistData} key={artistData.artistId} />
      ))}
    </>
  )
}

export default ReportsScreen
