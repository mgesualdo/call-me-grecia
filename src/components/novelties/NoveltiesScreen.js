import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { UserNavbar } from '../ui/UserNavbar'
import NoveltiesForm from './NoveltiesForm'

import './NoveltiesScreen.css'
import Novelty from './Novelty'

const NoveltiesScreen = () => {
  const { loggedUser } = useSelector((state) => state.auth)
  const [noveltyId, setNoveltyId] = useState()
  const [noveltyStart, setNoveltyStart] = useState()
  const [noveltyEnd, setNoveltyEnd] = useState()
  const [noveltyComments, setNoveltyComments] = useState()
  const [addingNovelty, setAddingNovelty] = useState(true)

  return (
    <div>
      <UserNavbar />
      <div className='novelties-screen-container'>
        <NoveltiesForm
          noveltyId={noveltyId}
          noveltyStart={noveltyStart}
          noveltyEnd={noveltyEnd}
          noveltyComments={noveltyComments}
          setNoveltyStart={setNoveltyStart}
          setNoveltyEnd={setNoveltyEnd}
          setNoveltyComments={setNoveltyComments}
          addingNovelty={addingNovelty}
        />
        <div className='novelties-container'>
          {loggedUser.novelties.map((n) => (
            <Novelty
              novelty={n}
              key={n._id}
              setNoveltyStart={setNoveltyStart}
              setNoveltyEnd={setNoveltyEnd}
              setNoveltyComments={setNoveltyComments}
              setAddingNovelty={setAddingNovelty}
              setNoveltyId={setNoveltyId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoveltiesScreen
