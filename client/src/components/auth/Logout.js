import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

import { ReactComponent as CloseIcon } from '../../icons/close.svg'

import '../../styles/components/Logout.css'

import Alert from '../Alert';

export default function Logout() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login')
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <div className="nav-item logout-container">
      {error && <Alert variant="danger">{error}</Alert>}
      <button className="btn-primary logout-btn" onClick={handleLogout}>
        <div className="close-icon"><CloseIcon /></div>
        <div className="logout-btn-label">Logout</div>
      </button>
    </div>
  )
}
