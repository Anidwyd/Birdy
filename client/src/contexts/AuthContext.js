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

    return axios.post("user", user)
  }

  async function login(email, password) {
    const response = await axios.post("user/login", {
        login: email,
        password: password
      })

    await setUser()

    return response
  }

  function logout() {
    return axios.delete("user/logout")
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

  async function setUser() {
    const response = await axios.get("user/login");

    if (response && response.data && response.data["status"] === "200") {
      const user_id = response.data["user_id"]
      const user = response.data["user"]

      setCurrentUser({
        user_id: user_id,
        email: user["login"],
        password: user["password"],
        username: user["firstname"] + ' ' + user["lastname"]
      })
    } else {
      setCurrentUser({
        user_id: 1,
        email: "jules@mail.com",
        password: "password",
        username: "Jules Dubreuil"
      })
    }

    console.log(response);

    return currentUser;
  }

  useEffect(() => {
    // const unsubscribe = axios.get("user/login")
    //   .then((res) => {
    //     console.log("response:", res.data)
    setLoading(false)
    //   })
    //   .catch((err) => console.log(err))

    // return unsubscribe

  }, []);

  const value = {
    currentUser,
    setUser,
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
