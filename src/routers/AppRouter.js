
import React from 'react'
import { Router, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';
import AddExpensePage from '/src/components/AddExpensePage'
import EditExpensePage from '/src/components/EditExpensePage'
import ExpenseDashboardPage from '/src/components/ExpenseDashboardPage'
import NotFoundPage from '/src/components/NotFoundPage'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div>      
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter