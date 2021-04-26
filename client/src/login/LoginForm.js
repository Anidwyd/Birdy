import React from 'react';
import SigninPage from './SigninPage'
import SignupPage from './SignupPage'

function LoginForm(props) {

  const {login, haveAccount, noAccount, isRegistered} = props;

  return (
    <div>
      { isRegistered
        ? <SigninPage login={login} noAccount={noAccount}/>
        : <SignupPage login={login} haveAccount={haveAccount}/>
      }
    </div>
  );
}

export default LoginForm;
