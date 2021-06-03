import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router-dom'
import { AddAppointmentFab } from '../components/ui/Fabs/AddAppointmentFab'

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  isUser,
  ...rest
}) => {
  if (isUser) {
    return (
      <Route
        {...rest}
        component={(props) =>
          isAuthenticated ? (
            <>
              <Component {...props} />
              {!window.location.href.includes('/users/appointments/create') && (
                <AddAppointmentFab />
              )}
            </>
          ) : (
            <Redirect to='/users/login' />
          )
        }
      />
    )
  }

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/clients/login' />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}
