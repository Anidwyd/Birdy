import React from 'react';
import Message from './Message';

export default function MessageList({ messages }) {
  return (
    <div className='message-list'>
      {messages.map((msg) => {
        return <Message key={msg._id} id={msg._id} author_name={msg.author_name} content={msg.content} date={msg.date} comments={msg.comments} likes={msg.likers.length} />;
      })}
    </div>
  )
}