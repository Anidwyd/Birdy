import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import { AuthProvider } from '../contexts/AuthContext';
import Main from './main/Main';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';

import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/forgot-password" component={ ForgotPassword } />
            <PrivateRoute exact path="/update-profile" component={ UpdateProfile } />
            <PrivateRoute path="/" component={ Main } />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;