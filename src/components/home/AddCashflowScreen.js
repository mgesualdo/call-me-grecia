import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { UserNavbar } from '../ui/UserNavbar'

import './homeScreen.css'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { cashflowConcepts } from '../../utils/constants'

const baseUrl = process.env.REACT_APP_API_URL

const AddCashflowScreen = () => {
  const { users } = useSelector((state) => state.user)
  const { loggedUser } = useSelector((state) => state.auth)
  const [details, setDetails] = useState('')
  const [selectedConcept, setSelectedConcept] = useState('')
  const [selectedTo, setSelectedTo] = useState('')
  const [amount, setAmount] = useState()

  const location = useLocation()

  const creatingCashflow = location.pathname.includes('create')
  console.log({ creatingCashflow })

  const history = useHistory()

  const handleSumbit = (e) => {
    e.preventDefault()
    if (
      !selectedConcept ||
      !amount ||
      (selectedConcept === 'GIRO' && !selectedTo)
    )
      return

    const url = `${baseUrl}/cashflow`

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: creatingCashflow ? 'POST' : 'PUT',
      body: JSON.stringify({
        concept: selectedConcept,
        from: loggedUser._id,
        to: selectedConcept === 'GIRO' ? selectedTo : null,
        details,
        amount,
        isSpending: cashflowConcepts.find((c) => c.name === selectedConcept)
          .isSpending,
        isInvestment: cashflowConcepts.find((c) => c.name === selectedConcept)
          .isInvestment,
        accepted: loggedUser.name === 'Grecia',
        createdBy: loggedUser._id,
      }),
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.ok) {
          Swal.fire('Listo!', response.message, 'success')
          history.goBack()
        } else {
          Swal.fire('Datos incorrectos', response.message, 'warning')
        }
      })
      .catch((e) => {
        Swal.fire(
          'Error del servidor',
          'Contacte al administrador de la aplicación',
          'error'
        )
      })
  }

  return (
    <>
      <UserNavbar />

      <div
        style={{
          width: '27rem',
          maxWidth: '95%',
          padding: '1rem 2rem 2rem 2rem',
          margin: '0 auto',
          backgroundColor: 'white',
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          aligntItems: 'center',
          borderRadius: '0.5rem',
        }}
      >
        <h1 style={{ margin: '0 0 1rem 0', textAlign: 'center' }}>
          {creatingCashflow ? 'Creando' : 'Editando'} movimiento
        </h1>
        <label htmlFor='concept'>Concepto</label>
        <select
          name='concept'
          id=''
          onChange={({ target }) => setSelectedConcept(target.value)}
          style={{ padding: ' 0.5rem 1rem', marginBottom: '1rem' }}
          placeholder='Concepto...'
          aria-placeholder='Concepto...'
        >
          <option value=''></option>
          {cashflowConcepts.map(({ name, isSpending, isInvestment }) => (
            <>
              <option value={name} selected={name === selectedConcept}>
                {name}
              </option>
            </>
          ))}
        </select>
        {selectedConcept === 'GIRO' && (
          <>
            <label htmlFor='to'>Girarle a...</label>
            <select
              name='to'
              id=''
              onChange={({ target }) => setSelectedTo(target.value)}
              style={{ padding: ' 0.5rem 1rem', marginBottom: '1rem' }}
            >
              <option value=''></option>
              {users
                .filter(
                  (user) =>
                    !user.deleted &&
                    user._id !== loggedUser._id &&
                    user.name !== 'Martin'
                )
                .map((user) => (
                  <option value={user._id}>{user.name}</option>
                ))}
            </select>
          </>
        )}
        <label htmlFor='amount'>Monto</label>
        <input
          type='number'
          name='amount'
          min='0'
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
          style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
        />
        <label htmlFor='details'>Detalles</label>
        <textarea
          value={details}
          name='details'
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
          style={{ width: '100%', padding: '0.5rem 1rem' }}
        />

        <button
          style={{
            padding: '1rem',
            fontSize: '1rem',
            border: 'none',
            fontWeight: 'bold',
            borderRadius: '1rem',
            width: '100%',
            marginTop: '1rem',
          }}
          onClick={handleSumbit}
        >
          Crear movimiento
        </button>
      </div>
    </>
  )
}

export default AddCashflowScreen
