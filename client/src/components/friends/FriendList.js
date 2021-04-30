import React from 'react';
import Friend from './Friend';

export default function FriendList({ friends }) {
  return (
    <div className='friend-list'>
      {friends.map((friend, index) => {
        return <Friend key={index} username={friend.username} />;
      })}
    </div>
  )
}