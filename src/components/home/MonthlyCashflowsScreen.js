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
  const [summary, setSummary] = useState({})
  const [formattedDate, setFormattedDate] = useState('')

  const history = useHistory()

  const handleClick = (e) => {
    history.goBack()
  }

  const handleSelectDate = ({ target }) => {
    const date = new Date(target.value)
    const formattedDate = format(date, 'MM-yyyy')
    setSelectedDate(format(date, 'yyyy-MM-dd'))
    setFormattedDate(formattedDate)

    const url = `${baseUrl}/report/cashflow?date=${formattedDate}&userId=${loggedUser._id}`

    setIsLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then(({ monthlyCashflows }) => {
        setIsLoading(false)

        setMonthlyCashflows(monthlyCashflows)
        const summary = monthlyCashflows
          .filter(({ _id }) => _id.month === formattedDate)
          .reduce(
            (prev, curr) => {
              const { isSpending, isInvestment, concept, kind } = curr._id

              console.log({ prev, curr })

              return {
                incomesCMG:
                  prev.incomesCMG +
                  (!isSpending && !isInvestment && kind === 'CMG'
                    ? curr.amount
                    : 0) -
                  (concept === 'Devolución seña' && kind === 'CMG'
                    ? curr.amount
                    : 0),
                spentsCMG:
                  prev.spentsCMG +
                  (isSpending && kind === 'CMG' ? curr.amount : 0),
                investmentsCMG:
                  prev.investmentsCMG +
                  (isInvestment && kind === 'CMG' ? curr.amount : 0),
                incomes:
                  prev.incomes +
                  (!isSpending && !isInvestment && kind === 'Personal'
                    ? curr.amount
                    : 0) -
                  (concept === 'Devolución seña' && kind === 'Personal'
                    ? curr.amount
                    : 0),
                spents:
                  prev.spents +
                  (isSpending && kind === 'Personal' ? curr.amount : 0),
                investments:
                  prev.investments +
                  (isInvestment && kind === 'Personal' ? curr.amount : 0),
              }
            },
            {
              incomesCMG: 0,
              spentsCMG: 0,
              investmentsCMG: 0,
              incomes: 0,
              spents: 0,
              investments: 0,
            }
          )
        setSummary(summary)
      })
      .catch(console.log)
  }

  useEffect(() => {
    const date = new Date()
    const formattedDate = format(date, 'MM-yyyy')
    setSelectedDate(format(date, 'yyyy-MM-dd'))
    setFormattedDate(formattedDate)

    const url = `${baseUrl}/report/cashflow?date=${formattedDate}&userId=${loggedUser._id}`

    setIsLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then(({ monthlyCashflows }) => {
        setIsLoading(false)

        setMonthlyCashflows(monthlyCashflows)
        const summary = monthlyCashflows
          .filter(({ _id }) => _id.month === formattedDate)
          .reduce(
            (prev, curr) => {
              const { isSpending, isInvestment, concept, kind } = curr._id

              return {
                incomesCMG:
                  prev.incomesCMG +
                  (!isSpending && !isInvestment && kind === 'CMG'
                    ? curr.amount
                    : 0) -
                  (concept === 'Devolución seña' && kind === 'CMG'
                    ? curr.amount
                    : 0),
                spentsCMG:
                  prev.spentsCMG +
                  (isSpending && kind === 'CMG' ? curr.amount : 0),
                investmentsCMG:
                  prev.investmentsCMG +
                  (isInvestment && kind === 'CMG' ? curr.amount : 0),
                incomes:
                  prev.incomes +
                  (!isSpending && !isInvestment && kind === 'Personal'
                    ? curr.amount
                    : 0) -
                  (concept === 'Devolución seña' && kind === 'Personal'
                    ? curr.amount
                    : 0),
                spents:
                  prev.spents +
                  (isSpending && kind === 'Personal' ? curr.amount : 0),
                investments:
                  prev.investments +
                  (isInvestment && kind === 'Personal' ? curr.amount : 0),
              }
            },
            {
              incomesCMG: 0,
              spentsCMG: 0,
              investmentsCMG: 0,
              incomes: 0,
              spents: 0,
              investments: 0,
            }
          )
        setSummary(summary)
      })
      .catch(console.log)
  }, [])

  console.log({ summary, monthlyCashflows })

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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: '1rem',
          }}
        >
          <div className='summary'>
            <p>Ingresos</p>
            <h4
              style={{
                fontWeight: 'bold',
                color: 'green',
                marginBottom: '0.4rem',
              }}
            >
              {numberFormat.format(summary.incomesCMG)}
            </h4>
            <h4
              style={{
                fontWeight: 'bold',
                color: 'green',
              }}
            >
              {numberFormat.format(summary.incomes)}
            </h4>
          </div>
          <div className='summary'>
            <p>Gastos</p>
            <h4
              style={{
                fontWeight: 'bold',
                color: 'red',
                marginBottom: '0.4rem',
              }}
            >
              {numberFormat.format(summary.spentsCMG)}
            </h4>
            <h4
              style={{
                fontWeight: 'bold',
                color: 'red',
              }}
            >
              {numberFormat.format(summary.spents)}
            </h4>
          </div>
          <div className='summary'>
            <p>Inversiones</p>
            <h4 style={{ marginBottom: '0.4rem' }}>
              {numberFormat.format(summary.investmentsCMG)}
            </h4>
            <h4>{numberFormat.format(summary.investments)}</h4>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <Spinner changeColor='blue' />
          ) : (
            monthlyCashflows
              .filter(({ _id }) => _id.month === formattedDate)
              .sort(
                (a, b) =>
                  a._id.kind.localeCompare(b._id.kind) || b.amount - a.amount
              )
              .map(({ _id, amount }) => (
                <div
                  className='cashflow-container'
                  key={_id.month + _id.concept + _id.kind}
                >
                  <div
                    style={{
                      width: '12rem',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <b>{_id.kind}</b>
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
        .summary {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
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
