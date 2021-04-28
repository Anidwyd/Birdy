import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as HomeIcon } from '../../icons/home.svg'
import { ReactComponent as ProfileIcon } from '../../icons/profile.svg'
import { ReactComponent as BookmarkIcon } from '../../icons/bookmark.svg'

import '../../styles/components/Navbar.css'

export default function Navbar() {
  function NavItem(props) {
    return (
      <li className="nav-item">
        <Link className="nav-link" to={props.to}>
          { props.children }
        </Link>
      </li>
    );
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavItem to="/"><HomeIcon />Home</NavItem>
        <NavItem to="/profile"><ProfileIcon />Profile</NavItem>
        <NavItem to="/notifs"><BookmarkIcon />Bookmarks</NavItem>
      </ul>
    </nav>
  )
}


