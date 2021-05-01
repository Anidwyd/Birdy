import React from 'react';
import Message from './Message';

export default function MessageList({ messages }) {
  return (
    <div className='message-list'>
      {messages.map((msg, index) => {
        return <Message key={index} author_name={msg.author_name} content={msg.content} date={msg.date} comments={msg.comments} likes={msg.likers.length} />;
      })}
    </div>
  )
}