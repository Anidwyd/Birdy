import React from 'react'
import Signup from './auth/Signup';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './main/Main';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';

// import PrivateRoute from './PrivateRoute';

function App() {


  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;