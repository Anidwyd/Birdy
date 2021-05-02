import React from 'react';
import User from './User';

export default function UserList({ users }) {

  return (
    <div className='user-list'>
      {users.map((user, index) => {
        return <User key={index} id={index} username={user.firstname + ' ' + user.lastname} />;
      })}
    </div>
  )
}