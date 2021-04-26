import React from 'react';

function Signup(props) {
  
  const {login, haveAccount} = props;

  return (
    <div className="login-form">
      <h1>S'inscrire à Birdy</h1>
      <form>
        <label>Email</label> <input type="text"/>
        <label>Mot de passe</label> <input type="text"/>
        <button onClick={login}>Sign up</button>
        <a href="#" onClick={haveAccount}>Deja un compte</a>
      </form>
    </div>
  )
}

export default Signup;