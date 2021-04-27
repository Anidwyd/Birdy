import React, { useState } from 'react';
import '../css/layouts/main.css'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function MainPage(props) {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  function handleLogout() {
    setError('');

    try {
      /*await*/ logout();
      history.pushState('/login')
    } catch {
      setError('Failed to log out.');
    }
  }

  return (
    <main>
      
      <header>Header</header>

      <nav className="navbar">
        Profile
      </nav>

      <div className="content">
        <h2>Profile</h2>
        {error && <label>error</label>}
        <strong>Email: </strong>
        <Link to="/update-profile" className="link">Update Profile</Link>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>

      <aside>
        Friends
      </aside>

    </main>
  );
}