import React from 'react';

export default function Friend(props){
  return(
    <div className='friend-card'>
      <span>{props.username}</span>
    </div>
  )
}