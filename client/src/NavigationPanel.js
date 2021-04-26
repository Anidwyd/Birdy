import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

export default function NavigationPanel(props){
  return (
    <nav>
      { props.isConnected
        ? <div>
            <h1>Birdy</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quaerat quo temporibus, deserunt perspiciatis cumque, omnis est at quia suscipit esse molestiae quod placeat, illo explicabo quam libero illum aliquam.
            </p>
            <Logout logout={props.logout}/>
          </div>

        : props.page === 'login'
          ? <Login login={props.login}/>
          : <Register login={props.login}/>
      }
    </nav>
  );
}