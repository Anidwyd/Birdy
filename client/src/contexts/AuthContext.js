import React, { useContext, useEffect, useState } from 'react';

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
    // Login user with promise
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
    // const unsubscribe = axios.get(user => {
    //   setCurrentUser(user);
    //   setLoading(false);
    // })
    
    // return unsubscribe;
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
