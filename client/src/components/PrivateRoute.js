import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  const isLoggedIn = () => {
    try {
      if (localStorage.getItem("user"))
        return true
    } catch (err) {
      console.log("Error getting the stored user")
    }
    return false
  }

  return (
    <Route
      {...rest}
      render={props => {
        return isLoggedIn
          ? <Component {...props} />
          : <Redirect to="/login" />
      }}
    ></Route>
  )
}
