import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { UserNavbar } from '../ui/UserNavbar'

import './homeScreen.css'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import Spinner from '../ui/Spinner'

const baseUrl = process.env.REACT_APP_API_URL

const options = { style: 'currency', currency: 'ARS' }
const numberFormat = new Intl.NumberFormat('es-AR', options)

const CashflowsScreen = () => {
  const { loggedUser } = useSelector((state) => state.auth)
  const [cashflows, setCashflows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [personalCash, setPersonalCash] = useState(0)
  const [showOtherCashflows, setShowOtherCashflows] = useState(false)
  const [saldos, setSaldos] = useState([])

  const history = useHistory()

  const handleClick = (e) => {
    history.push('/users/cashflows/create')
  }

  useEffect(() => {
    const url = `${baseUrl}/cashflow/${loggedUser._id}`

    setIsLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then(({ data, saldos }) => {
        setIsLoading(false)
        const { collected, spent } = saldos.find(
          (s) => s._id.users[0] === loggedUser._id && s._id.kind === 'Personal'
        )
        setSaldos(saldos)
        setPersonalCash(collected - spent)
        setCashflows(data)
      })
      .catch(console.log)
  }, [])

  console.log({ cashflows })

  return (
    <>
      <UserNavbar />

      <div className='container'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <span
            style={{
              margin: '0 0 1rem 0',
              fontSize: '1.4rem',
              textAlign: 'center',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            Saldo{' '}
            <span
              style={{
                color: `${personalCash > 0 ? 'green' : 'red'}`,
              }}
            >
              {numberFormat.format(personalCash)}
            </span>
            {loggedUser.name === 'Grecia' && (
              <i
                className={`far fa-eye${showOtherCashflows ? '' : '-slash'}`}
                style={{ marginLeft: '1rem', cursor: 'pointer' }}
                onClick={() => setShowOtherCashflows(!showOtherCashflows)}
              />
            )}
          </span>
          <button onClick={handleClick}>Nuevo movimiento</button>
        </div>
        {showOtherCashflows && loggedUser.name === 'Grecia' && (
          <div
            style={{
              marginTop: '1.5rem',
            }}
          >
            {saldos
              .filter((s) => s._id.name !== 'Grecia')
              .map((s) => (
                <div
                  style={{
                    display: 'flex',
                    width: '12rem',
                    justifyContent: 'space-between',
                    marginTop: '0.3rem',
                  }}
                  key={s._id.id}
                >
                  <span>{s._id.name}</span>

                  <span
                    style={{
                      color: `${s.collected - s.spent > 0 ? 'green' : 'red'}`,
                    }}
                  >
                    {numberFormat.format(s.collected - s.spent)}
                  </span>
                </div>
              ))}
          </div>
        )}
        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <Spinner changeColor='blue' />
          ) : (
            cashflows
              .sort((a, b) => (a._id > b._id ? -1 : 1))
              .map((c) => (
                <div className='cashflow-container' key={c._id}>
                  <div style={{ width: '7rem' }}>
                    <span
                      style={{
                        color: 'blue',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                      }}
                    >
                      {c.concept}
                    </span>
                    <p style={{ fontWeight: 'bold' }}>
                      {numberFormat.format(c.amount)}
                    </p>
                  </div>
                  <span style={{ width: '13rem' }}>{c.details}</span>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: !c?.from ? 'flex-end' : 'flex-start',
                      height: '3rem',
                      width: '6rem',
                      textAlign: 'right',
                    }}
                  >
                    <span
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                      }}
                    >
                      {c?.from?.name}
                    </span>
                    <span
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                      }}
                    >
                      {c?.to?.name}
                    </span>
                  </div>
                  <small
                    style={{ position: 'absolute', right: '1rem', bottom: '0' }}
                  >
                    {format(new Date(c.createdAt), 'dd/MM HH:mm')}
                  </small>
                </div>
              ))
          )}
        </div>
      </div>
      <style jsx>{`
        p {
          margin: 0;
        }
        .cashflow-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem 2rem 1rem;
          box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.2);
          margin-bottom: 1rem;
        }
        button {
          padding: 0.7rem 1rem !important;
          border: none;
          border-radius: 0.5rem;
          background-color: #333;
          color: white;
        }

        button:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }

        .container {
          width: 35rem;
          max-width: 95%;
          padding: 1rem;
          margin: 0 auto;
          background-color: white;
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          alignt-items: center;
          border-radius: 0.5rem;
        }

        @media screen and (max-width: 1150px) {
          .container {
            width: 95%;
          }
        }
      `}</style>
    </>
  )
}

export default CashflowsScreen
