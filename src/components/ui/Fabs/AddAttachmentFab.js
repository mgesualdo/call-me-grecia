import React from 'react'
import './addAttachmentFab.css'
import { useHistory } from 'react-router'

export const AddAttachmentFab = ({ appointment }) => {
  const history = useHistory()
  const handleClick = () =>
    history.push({
      pathname: '/users/clients/attachment',
      state: { appointment: appointment },
    })

  const cantAttachments = appointment.attachments?.length

  return (
    <>
      <button
        className={`attachment-fab ${cantAttachments > 0 && 'has-attachments'}`}
        onClick={handleClick}
      >
        <>
          <i className='fas fa-paperclip'></i>
        </>
      </button>
    </>
  )
}
