import React from 'react';

export default function MessageForm(props){
  return (
  <div className="login-form">
      <h1>Poster</h1>
      <form>
        <textarea placeholder="Ecrivez votre message ici..."></textarea>
        <button onClick={props.login}>
          Envoyer
        </button>
      </form>
    </div>
  )
}