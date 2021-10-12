import React from 'react'
import './addCommentFab.css'
import { useHistory } from 'react-router'

export const AddCommentFab = ({ appointment }) => {
  const history = useHistory()
  const handleClick = () =>
    history.push({
      pathname: '/users/clients/comment',
      state: { appointment: appointment },
    })

  const cantComments = appointment.comments?.length

  return (
    <>
      <button
        className={`comment-fab ${cantComments > 0 && 'has-comments'}`}
        onClick={handleClick}
      >
        <>
          <i className='fas fa-pencil-alt'></i>
        </>
      </button>
    </>
  )
}
