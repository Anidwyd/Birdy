import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)

  function signup(firstname, lastname, email, password) {
    const user = {
      login: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    }

    return axios.post("api/user", user)
  }

  function login(email, password) {

    return axios.post("api/authentification", { login: email, password: password })
  }

  function logout() {
    return axios.delete("api/authentification")
  }

  function resetPassword(email) {
    // 
  }

  function updateEmail(email) {
    // 
  }

  function updatePassword(password) {
    // 
  }

  useEffect(() => {
    // const unsubsribe = (user) => {
    setCurrentUser({});
    setLoading(false)
    // }
    
    // return unsubsribe
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  );
}
