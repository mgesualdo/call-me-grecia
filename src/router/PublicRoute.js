import React from 'react'
import PropTypes from 'prop-types'
import { WhatsappFab } from '../components/ui/Fabs/WhatsappFab'

import { Route, Redirect } from 'react-router-dom'
import Address from '../components/ui/Address'
import { InstagramFab } from '../components/ui/Fabs/InstagramFab'

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
          <>
            <Component {...props} />
            {path !== '/clients/login' && path !== '/clients/register' && (
              <>
                <Address />
                <InstagramFab />
                <WhatsappFab />
              </>
            )}
          </>
        )
      }
    />
  )
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}
