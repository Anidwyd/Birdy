import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Profile() {
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

  return (
    <div className="profile">
      {/* <h2>Profile</h2> */}
      {error && <label>error</label>}
      <p>
        <strong>Prenom Nom</strong><br />
        <strong>Email: </strong> prenom.nom@mail.com
      </p>
      <Link to="/update-profile" className="link">Update Profile</Link>
      <button className="btn-primary" onClick={handleLogout}>Logout</button>
    </div>
  )
}
