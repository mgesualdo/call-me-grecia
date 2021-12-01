import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { UserNavbar } from '../ui/UserNavbar'

import './homeScreen.css'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { cashflowConcepts } from '../../utils/constants'
import Spinner from '../ui/Spinner'

const baseUrl = process.env.REACT_APP_API_URL

const AddCashflowScreen = () => {
  const { loggedUser } = useSelector((state) => state.auth)
  const [details, setDetails] = useState('')
  const [wallets, setWallets] = useState([])
  const [userWallets, setUserWallets] = useState([])
  const [selectedConcept, setSelectedConcept] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [kind, setKind] = useState('CMG')
  const [selectedWalletTo, setSelectedWalletTo] = useState(null)
  const [selectedWalletFrom, setSelectedWalletFrom] = useState(null)
  const [amount, setAmount] = useState()

  const location = useLocation()

  const creatingCashflow = location.pathname.includes('create')

  const history = useHistory()

  const handleSumbit = (e) => {
    e.preventDefault()
    if (
      !selectedConcept ||
      !amount ||
      ((selectedConcept === 'GIRO' ||
        selectedConcept === 'Saldo inicial' ||
        selectedConcept === 'Venta productos') &&
        !selectedWalletTo) ||
      isLoading
    )
      return

    const url = `${baseUrl}/cashflow`

    setIsLoading(true)
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: creatingCashflow ? 'POST' : 'PUT',
      body: JSON.stringify({
        kind,
        concept: selectedConcept,
        from: userWallets.length === 1 ? userWallets[0] : selectedWalletFrom,
        to: selectedWalletTo,
        details,
        amount,
        isSpending: cashflowConcepts.find((c) => c.name === selectedConcept)
          .isSpending,
        isInvestment: cashflowConcepts.find((c) => c.name === selectedConcept)
          .isInvestment,
        accepted: soyGrecia,
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
        setIsLoading(false)
        Swal.fire(
          'Error del servidor',
          'Contacte al administrador de la aplicación',
          'error'
        )
      })
  }
  console.log({ kind })

  useEffect(() => {
    fetch(`${baseUrl}/wallet`)
      .then((res) => res.json())
      .then(({ wallets }) => {
        setUserWallets(wallets.filter((w) => w.users.includes(loggedUser._id)))
        setWallets(wallets)
      })
  }, [])

  const soyGrecia = loggedUser.name === 'Grecia'

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
        {soyGrecia && (
          <>
            <label htmlFor='concept'>Tipo de caja</label>
            <select
              name='kind'
              id=''
              onChange={({ target }) => setKind(target.value)}
              style={{ padding: ' 0.5rem', marginBottom: '1rem' }}
              placeholder='Tipo de caja...'
            >
              {['CMG', 'Personal'].map((value) => (
                <>
                  <option value={value} selected={value === kind}>
                    {value}
                  </option>
                </>
              ))}
            </select>
          </>
        )}
        <label htmlFor='concept'>Concepto</label>
        <select
          name='concept'
          id=''
          onChange={({ target }) => setSelectedConcept(target.value)}
          style={{ padding: ' 0.5rem', marginBottom: '1rem' }}
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
        {((userWallets.length > 1 && selectedConcept !== 'Saldo inicial') ||
          soyGrecia) && (
          <>
            <label htmlFor='from'>Wallet de origen</label>
            <select
              name='from'
              id=''
              onChange={({ target }) => setSelectedWalletFrom(target.value)}
              style={{ padding: ' 0.5rem', marginBottom: '1rem' }}
            >
              <option value=''></option>
              {userWallets
                .filter((wallet) => wallet._id !== selectedWalletTo)
                .map((wallet) => (
                  <option value={wallet._id}>{wallet.name}</option>
                ))}
            </select>
          </>
        )}
        {(selectedConcept === 'GIRO' ||
          selectedConcept === 'Saldo inicial' ||
          selectedConcept === 'Venta productos') && (
          <>
            <label htmlFor='to'>Wallet de destino</label>
            <select
              name='to'
              id=''
              onChange={({ target }) => setSelectedWalletTo(target.value)}
              style={{ padding: ' 0.5rem', marginBottom: '1rem' }}
            >
              <option value=''></option>
              {wallets
                .filter((wallet) => wallet._id !== selectedWalletFrom)
                .map((wallet) => (
                  <option value={wallet._id}>{wallet.name}</option>
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
          style={{ padding: '0.5rem', marginBottom: '1rem' }}
        />
        <label htmlFor='details'>Detalles</label>
        <textarea
          value={details}
          name='details'
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
          style={{ width: '100%', padding: '0.5rem' }}
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
            border: 'none',
          }}
          onClick={handleSumbit}
        >
          {isLoading ? <Spinner smallest /> : 'Crear movimiento'}
        </button>
      </div>
      <style jsx>{`
        button:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  )
}

export default AddCashflowScreen
