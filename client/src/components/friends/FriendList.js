import React, { useState } from 'react';
import Friend from './Friend';

export default function FriendList(props) {
    return (
        <div className='FriendList'>
            {props.friends.map((friend, index) => {
                return <Friend username = {friend.username} />;
            })}
        </div>
    )
}