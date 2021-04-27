import React, { useState } from 'react';
import Message from './Message';

export default function MessageList(props) {
  return (
    <div className='MessageList'>
      {props.messages.map((msg, index) => {
        return <Message username = {msg.username} content = {msg.content} timestamp = {msg.timestamp}/>;
      })}
    </div>
  )
}