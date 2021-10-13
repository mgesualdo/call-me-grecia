import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

import { LoginClientScreen } from '../components/auth/LoginClientScreen'
import HomeScreen from '../components/home/HomeScreen'
import AddAttachmentScreen from '../components/home/AddAttachmentScreen'
import AddCommentScreen from '../components/home/AddCommentScreen'
import AddCashflowScreen from '../components/home/AddCashflowScreen'
import CashflowsScreen from '../components/home/CashflowsScreen'
import MonthlyCashflowsScreen from '../components/home/MonthlyCashflowsScreen'
import HomeScreenUser from '../components/home/HomeScreenUser'
import ChangeAppointmentDateScreen from '../components/home/ChangeAppointmentDateScreen'
import AppointmentsScreen from '../components/clients/AppointmentsScreen'

import { LoginUserScreen } from '../components/auth/LoginUserScreen'
import UserUsersScreen from '../components/users/UserUsersScreen'
import UserCalendarScreen from '../components/users/UserCalendarScreen'

import ActivationScreen from '../components/auth/ActivationScreen'

import { getUsers, getUserAppointments } from '../actions/users'
import { getClientAppointments, getClients } from '../actions/client'
import { getServices } from '../actions/services'
import ProfileScreen from '../components/clients/ProfileScreen'
import UserProfileScreen from '../components/users/UserProfileScreen'
import ServicesScreen from '../components/services/ServicesScreen'
import VerifyEmailScreen from '../components/auth/VerifyEmailScreen'
import ClientsScreen from '../components/clients/ClientsScreen'
import RegisterClientScreen from '../components/auth/RegisterClientScreen'
import ClientPasswordChangeScreen from '../components/clients/ClientPasswordChangeScreen'
import UserAppointmentsByDateScreen from '../components/clients/UserAppointmentsByDateScreen'
import NoveltiesScreen from '../components/novelties/NoveltiesScreen'
import ReportsScreen from '../components/reports/ReportsScreen'

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
)

export const AppRouter = () => {
  const { loggedClient } = useSelector((state) => state.auth)
  const { loggedUser } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServices())
    dispatch(getClients())
    dispatch(getUsers())

    !!loggedClient && dispatch(getClientAppointments(loggedClient._id))
    !!loggedUser && dispatch(getUserAppointments(loggedUser._id))
  }, [dispatch, loggedUser, loggedClient])

  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <PublicRoute
            exact
            path='/clients/login'
            component={LoginClientScreen}
            isAuthenticated={!!loggedClient}
          />
          <PublicRoute
            exact
            path='/clients/register'
            component={RegisterClientScreen}
            isAuthenticated={!!loggedClient}
          />
          <PublicRoute
            exact
            path='/clients/verify/:secretToken'
            component={VerifyEmailScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PublicRoute
            exact
            path='/users/login'
            component={LoginUserScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/appointments/create'
            component={HomeScreenUser}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/cashflows'
            component={CashflowsScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/cashflows/create'
            component={AddCashflowScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/appointments/change-date'
            component={ChangeAppointmentDateScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/appointments/:selectedDate'
            component={UserAppointmentsByDateScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/reports'
            component={ReportsScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/reports/cashflow'
            component={MonthlyCashflowsScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/clients'
            component={ClientsScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/clients/attachment'
            component={AddAttachmentScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/clients/comment'
            component={AddCommentScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/users'
            component={UserUsersScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/services'
            component={ServicesScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/novelties'
            component={NoveltiesScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/clients/myappointments'
            component={AppointmentsScreen}
            isAuthenticated={!!loggedClient}
          />
          <PrivateRoute
            exact
            path='/clients/mypassword'
            component={ClientPasswordChangeScreen}
            isAuthenticated={!!loggedClient}
          />
          <PrivateRoute
            exact
            path='/clients/profile'
            component={ProfileScreen}
            isAuthenticated={!!loggedClient}
          />
          <PrivateRoute
            exact
            path='/users/profile'
            component={UserProfileScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PrivateRoute
            exact
            path='/users/calendario'
            component={UserCalendarScreen}
            isAuthenticated={!!loggedUser}
            isUser
          />
          <PublicRoute
            exact
            path='/'
            component={HomeScreen}
            isAuthenticated={!!loggedClient}
          />
          <PrivateRoute
            exact
            path='/activate/user/:id'
            component={ActivationScreen}
            isAuthenticated={!!loggedClient}
          />
          {!!loggedUser ? (
            <Redirect to='/users/login' />
          ) : (
            <Redirect to='/clients/login' />
          )}
        </Switch>
      </React.Suspense>
    </Router>
  )
}
