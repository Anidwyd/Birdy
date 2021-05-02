import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Profile from './content/Profile';
import Home from './content/Home';
import Content from './Content';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import { useAuth } from '../../contexts/AuthContext';
import '../../styles/layouts/main.css'
import Notifications from './content/Notifications';
import Bookmarks from './content/Bookmarks';
import Messages from './content/Messages';

export default function Main() {
  
  const { currentUser } = useAuth();

  const redirectHome = () => {
    return (
      <Redirect to="/home" />
    );
  };

  return (
    <main>

      <Navbar />

      <Route exact path="/" render={ redirectHome } />
      <Route path="/home" render={ () => <Content title="Home" component={Home} />} />
      <Route path="/profile" render={ () => <Content title={currentUser.username} component={Profile} /> } />
      <Route path="/notifications" render={ () => <Content title="Notifications" component={Notifications} /> } />
      <Route path="/bookmarks" render={ () => <Content title="Bookmarks" component={Bookmarks} /> } />
      <Route path="/messages" render={ () => <Content title="Messages" component={Messages} /> } />

      <Sidebar />

    </main>
  );
}