import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route {...rest} component={(props) => {
      return !isAuthenticated ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/dashboard" />
        )
    }}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.uid
  }
}

export default connect(mapStateToProps)(PublicRoute)