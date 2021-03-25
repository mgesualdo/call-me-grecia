import React from 'react'
import { format } from 'date-fns'
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { startRefreshLoggedUser } from '../../actions/auth'
import DeleteButton from '../ui/Buttons/DeleteButton'
import { uiLoadingDeleting } from '../../actions/ui'

const baseUrl = process.env.REACT_APP_API_URL

const Novelty = ({
  novelty,
  setNoveltyId,
  setNoveltyStart,
  setNoveltyEnd,
  setNoveltyComments,
  setAddingNovelty,
}) => {
  const { loggedUser } = useSelector((state) => state.auth)
  const { start, end, comments, _id } = novelty

  const dispatch = useDispatch()

  const handleEditNovelty = () => {
    setNoveltyId(_id)
    setNoveltyStart(new Date(start))
    setNoveltyEnd(new Date(end))
    setNoveltyComments(comments)
    setAddingNovelty(false)
  }
  const handleDeleteNovelty = () => {
    const url = `${baseUrl}/user/novelties/${_id}`

    dispatch(uiLoadingDeleting({ value: true, idBeingDeleted: _id }))

    fetch(url, {
      method: 'DELETE',
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.ok) {
          dispatch(startRefreshLoggedUser(loggedUser._id))
          Swal.fire('Listo!', response.message, 'success')
        } else {
          Swal.fire('Error', response.message, 'warning')
        }
        dispatch(uiLoadingDeleting({ value: false, idBeingDeleted: null }))
      })
      .catch((e) => {
        dispatch(uiLoadingDeleting({ value: false, idBeingDeleted: null }))
        Swal.fire(
          'Error del servidor',
          'Contacte al administrador de la aplicación',
          'error'
        )
      })
  }

  return (
    <div className='novelty'>
      <div className='from-to-container'>
        <div>
          <span className='from-to-text'>Desde</span>
          <time className='from-time'>
            {format(new Date(start), 'dd-MM-yyyy HH:mm', { locale: es })}
          </time>
        </div>
        <div>
          <span className='from-to-text'>Hasta</span>
          <time className='to-time'>
            {format(new Date(end), 'dd-MM-yyyy HH:mm', {
              locale: es,
            })}
          </time>
        </div>
      </div>
      <span>{comments}</span>

      <div
        style={{
          display: 'flex',
          width: '33%',
          justifyContent: 'flex-end',
        }}
      >
        <button className='btn btn-warning mr-3' onClick={handleEditNovelty}>
          <i className='fas fa-edit'></i>
        </button>
        <DeleteButton handleDelete={handleDeleteNovelty} idToDelete={_id} />
      </div>
    </div>
  )
}

export default Novelty
