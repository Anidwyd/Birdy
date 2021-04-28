import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import { AuthProvider } from '../contexts/AuthContext';
import Main from './main/Main';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';
import Home from './main/Home';
import Profile from './main/Profile';

// import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <Switch>
            {/* <Route exact path="/" component={Main} /> */}
            {/* <Route exact path="/home" component={<Main content={<Home/>} />} /> */}
            <Route exact path="/">
              <Main component={<Home/>} />
            </Route>
            <Route path="/profile">
              <Main component={<Profile/>} />
            </Route> 
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