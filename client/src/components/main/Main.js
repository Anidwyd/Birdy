import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import '../../styles/layouts/main.css'
import Header from './Header';

export default function MainPage({ component }) {

  return (
    <Router>
      <main>
        
        <Header>Header</Header>

        <Navbar />

        <div className="content">
          {component}
        </div>

        <Sidebar />

      </main>
    </Router>
  );
}