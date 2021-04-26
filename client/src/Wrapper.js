import React, { useState } from 'react';
import MainPage from './MainPage'
import LoginForm from './login/LoginForm'

function Wrapper(props) {

  const {login, logout, isConnected} = props;
  const [isRegistered, setRegistered] = useState(false);

  const haveAccount = () => setRegistered(true);
  const noAccount = () => setRegistered(false);

  return (
    <div>
      { isConnected
        ? <MainPage logout={logout}/>
        : <LoginForm login={login} haveAccount={haveAccount} noAccount={noAccount} isRegistered={isRegistered}/>
      }
    </div>
  );
}

export default Wrapper;
