import React from 'react';

function Signin(props) {
  
  const {login, noAccount} = props;

  return (
    <div className="login-form">
      <h1>Se Connecter à Birdy</h1>
      <form>
        <label>Email</label> <input type="text"/>
        <label>Mot de passe</label> <input type="text"/>
        <button onClick={login}>Sign in</button>
        <a href="#" onClick={noAccount}>Pas de compte</a>
      </form>
    </div>
  )
}

export default Signin;