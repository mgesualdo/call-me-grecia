import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  path,
  isUser,
  ...rest
}) => {
  if (isUser) {
    return (
      <Route
        {...rest}
        component={(props) =>
          isAuthenticated && path === '/users/login' ? (
            <Redirect to='/users/calendario' />
          ) : (
            <Component {...props} />
          )
        }
      />
    )
  }

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated && path === '/clients/login' ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}
