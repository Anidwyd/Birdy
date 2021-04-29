import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import { ReactComponent as Logo } from '../../icons/logo.svg'
import { ReactComponent as HomeIcon } from '../../icons/home.svg'
import { ReactComponent as ProfileIcon } from '../../icons/profile.svg'
import { ReactComponent as BookmarkIcon } from '../../icons/bookmark.svg'
import { ReactComponent as ContactsIcon } from '../../icons/contacts.svg'
import { ReactComponent as MessageIcon } from '../../icons/message.svg'

import '../../styles/components/Navbar.css'
import Logout from '../auth/Logout'

export default function Navbar() {
  function NavItem({ icon, name, to}) {
    return (
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link" to={to}>
          { icon }
          <div className="nav-item-name noselect">{ name }</div>
        </NavLink>
      </li>
    );
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavLink exact className="logo nav-link" to="/home"><Logo /></NavLink>
        <NavItem to="/home" icon={<HomeIcon />} name="Home" />
        <NavItem to="/profile" icon={<ProfileIcon />} name="Profile" />
        <NavItem to="/bookmarks" icon={<BookmarkIcon />} name="Bookmarks" />
        <NavItem to="/messages" icon={<MessageIcon />} name="Messages" />
        <NavItem to="/contacts" icon={<ContactsIcon />} name="Contacts" />
        <Logout />
      </ul>
    </nav>
  )
}


