import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

import { fetchSinToken } from '../../helpers/fetch'

const ArtistList = ({ artistValue, handleInputChange }) => {
  const [artists, setArtists] = useState([])

  const getArtists = useCallback(async () => {
    const resp = await fetchSinToken('user/', {}, 'GET')
    const data = await resp.json()

    setArtists(data.users)
  }, [])

  useEffect(() => {
    getArtists()
  }, [getArtists])

  return (
    <>
      <select
        name='artist'
        value={artistValue}
        onChange={handleInputChange}
        className='form-control form-control-lg'
      >
        <option value=''></option>
        {artists.map((artist) => (
          <option value={`${artist._id}`} key={artist._id}>
            {`${artist.name} ${artist.lastname}`}
          </option>
        ))}
      </select>
    </>
  )
}

export default ArtistList
