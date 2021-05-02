import React from 'react';

export default function User({ id, username }){
  return(
    <div key={id} className='user-card'>
      <span>{username}</span>
    </div>
  )
}