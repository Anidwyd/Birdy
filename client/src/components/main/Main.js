import React, { useState } from 'react';
import '../../css/layouts/main.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainPage(props) {

  return (
    <Router>
      <main>
        
        <header>Header</header>

        <Navbar />

        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </div>

        <Sidebar />

      </main>
    </Router>
  );
}