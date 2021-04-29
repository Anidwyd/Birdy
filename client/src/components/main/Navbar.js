import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

import { ReactComponent as HomeIcon } from '../../icons/home.svg'
import { ReactComponent as ProfileIcon } from '../../icons/profile.svg'
import { ReactComponent as BookmarkIcon } from '../../icons/bookmark.svg'
import { ReactComponent as Logo } from '../../icons/bird.svg'

import '../../styles/components/Navbar.css'

export default function Navbar() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  function handleLogout() {
    setError('');

    // try {
      /*await*/ logout();
      history.push('/login')
    // } catch {
    //   setError('Failed to log out.');
    // }
  }


  function NavItem(props) {
    return (
      <li className="nav-item">
        <NavLink exact activeClassName="active" className="nav-link" to={props.to}>
          { props.children }
        </NavLink>
      </li>
    );
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavLink exact className="logo nav-link" to="/">
          <Logo />
        </NavLink>
        <NavItem to="/"><HomeIcon />Home</NavItem>
        <NavItem to="/profile"><ProfileIcon />Profile</NavItem>
        <NavItem to="/bookmarks"><BookmarkIcon />Bookmarks</NavItem>
        <div className="nav-item logout-container">
          {error && <label>error</label>}
          <button className="btn-primary logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </ul>
    </nav>
  )
}


