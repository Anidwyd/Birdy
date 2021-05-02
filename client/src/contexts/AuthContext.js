import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)

  async function signup(firstname, lastname, email, password) {
    const user = {
      login: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    }

    const response = axios.post("user", user)
      .then((res) => {
        if (res.data["status"] === "201") {
          setCurrentUser({
            user_id: res.data["user_id"],
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
          })
        }
      })
      .catch((err) => console.log(err));

      return response;
  }

  async function login(email, password) {
    const response = await axios.post("user/login", {
        login: email,
        password: password
      })
      .then((res) => {
        const user_id = res.data["user_id"]
        setCurrentUser({
          user_id: res.data["user"],
          email: user["login"],
          password: user["password"],
          firstname: user["firstname"],
          lastname: user["lastname"]
        })
      })
      .catch((err) => console.log(err));

    return response;
  }

  async function logout() {
    const response = await axios.delete("user/login")
      .then((res) => {
        setCurrentUser({})
        console.log(currentUser);
      })
      .catch((err) => console.log(err));

    return response;
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
    // TODO: unsubscribe all
    setLoading(false)
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
