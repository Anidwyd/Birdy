import React from 'react';
import Message from './Message';

export default function MessageList({ messages }) {
  return (
    <div className='message-list'>
      {messages.map((msg, index) => {
        return <Message key={index} author={msg.author} content={msg.content} timestamp={msg.timestamp} comments={msg.comments} likes={msg.likes} />;
      })}
    </div>
  )
}