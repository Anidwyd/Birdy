import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

import '../../../styles/components/Profile.css'

export default function Profile() {

  const { currentUser } = useAuth()

  return (
    <div className="profile">
      <p>
        <strong>{currentUser.firstname} {currentUser.lastname}</strong><br />
        <strong>Email: </strong> {currentUser.email}
      </p>
      <Link to="/update-profile" className="link">Update Profile</Link>
    </div>
  )
}
