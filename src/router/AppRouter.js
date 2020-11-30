import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {
  const { loggedClient } = useSelector((state) => state.auth)

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path='/login'
            component={LoginScreen}
            isAuthenticated={!!loggedClient}
          />

          <PrivateRoute
            exact
            path='/'
            component={CalendarScreen}
            isAuthenticated={!!loggedClient}
          />

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}
