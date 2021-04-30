import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)

  function signup(firstname, surname, email, password) {
    // Register user with promise
  }

  function login(email, password) {
    return axios.post('api/user', {
        email: email,
        password: password
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function logout() {
    // Sign out with promise
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
    setLoading(false);
  }, [])

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
      { children }
    </AuthContext.Provider>
  );
}
