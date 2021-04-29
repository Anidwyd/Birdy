import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Profile from './content/Profile';
import Home from './content/Home';
import Content from './Content';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import '../../styles/layouts/main.css'

export default function Main() {

  const [title, setTitle] = useState('Home');
  const user = {firstname: "Jules", lastname: "Dubreuil"};

  const username = user.firstname + ' ' + user.lastname;

  const redirectHome = () => {
    return (
      <Redirect to="/home" />
    );
  };

  return (
    <main>

      <Navbar setTitle={ setTitle } />

      <Route exact path="/" render={ redirectHome } />
      <Route path="/home" render={ () => <Content title="Home" component={Home} />} />
      <Route path="/profile" render={ () => <Content title={username} component={Profile} /> } />
      <Route path="/bookmarks" render={ () => <Content title="Bookmarks" component={Profile} /> } />
      <Route path="/messages" render={ () => <Content title="Messages" component={Profile} /> } />

      <Sidebar />

    </main>
  );
}