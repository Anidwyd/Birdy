import React from 'react';

export default function Login(props){
  return (
    <div className="login-form">
      <h1>Se Connecter à Birdy</h1>
      <form>
        <label>Email</label>
        <input type="text"/>
        <label>Mot de passe</label>
        <input type="text"/>
        <button onClick={props.login}>Connexion</button>
      </form>
    </div>
  )
}