import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div className="profile">
      <p>
        <strong>Prenom Nom</strong><br />
        <strong>Email: </strong> prenom.nom@mail.com
      </p>
      <Link to="/update-profile" className="link">Update Profile</Link>
    </div>
  )
}
