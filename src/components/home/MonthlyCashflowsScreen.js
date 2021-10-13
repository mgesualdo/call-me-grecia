import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { UserNavbar } from '../ui/UserNavbar'

import './homeScreen.css'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Spinner from '../ui/Spinner'
import { format } from 'date-fns'

const baseUrl = process.env.REACT_APP_API_URL

const options = { style: 'currency', currency: 'ARS' }
const numberFormat = new Intl.NumberFormat('es-AR', options)

const MonthlyCashflowsScreen = () => {
  const { loggedUser } = useSelector((state) => state.auth)

  const [isLoading, setIsLoading] = useState(false)
  const [monthlyCashflows, setMonthlyCashflows] = useState([])
  const [selectedDate, setSelectedDate] = useState([])
  const [formattedDate, setFormattedDate] = useState([])

  const history = useHistory()

  const handleClick = (e) => {
    history.goBack()
  }

  const handleSelectDate = ({ target }) => {
    const date = new Date(target.value)
    const formattedDate = format(date, 'MM-yyyy')
    setSelectedDate(format(date, 'yyyy-MM-dd'))
    setFormattedDate(formattedDate)
  }

  useEffect(() => {
    const date = new Date()
    const formattedDate = format(date, 'MM-yyyy')
    setSelectedDate(format(date, 'yyyy-MM-dd'))
    setFormattedDate(formattedDate)

    const url = `${baseUrl}/report/cashflow`

    setIsLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then(({ monthlyCashflows }) => {
        setIsLoading(false)

        setMonthlyCashflows(monthlyCashflows)
      })
      .catch(console.log)
  }, [])

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
          <button onClick={handleClick}>Volver</button>

          <h2 style={{ fontWeight: 'bold', margin: 0 }}>{formattedDate}</h2>

          <input type='date' value={selectedDate} onChange={handleSelectDate} />
        </div>

        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <Spinner changeColor='blue' />
          ) : (
            monthlyCashflows
              .filter(({ _id }) => _id.month === formattedDate)
              .sort((a, b) => (a.amount > b.amount ? -1 : 1))
              .map(({ _id, amount }) => (
                <div className='cashflow-container' key={_id.month}>
                  <div style={{ width: '12rem' }}>
                    <span
                      style={{
                        color: 'blue',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                      }}
                    >
                      {_id.concept}
                    </span>
                  </div>
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: _id.isSpending
                        ? 'red'
                        : _id.isInvestment
                        ? 'black'
                        : 'green',
                    }}
                  >
                    {numberFormat.format(amount)}
                  </p>
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
          padding: 0.5rem 1rem 1rem 1rem;
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

export default MonthlyCashflowsScreen
