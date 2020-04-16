import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import Login from './components/Login/Login'
import CallbackHandler from './components/Login/CallbackHandler.jsx'
import { EmployeeListing } from './components/Employees/EmployeeListing'

import './custom.css'

export default class App extends React.Component {
  static displayName = App.name

  render(): JSX.Element {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/callback" component={CallbackHandler} />
        <Route path="/employees" component={EmployeeListing} />
      </Layout>
    )
  }
}
