import React from 'react';

export default function Message({index, author, content, timestamp}){
  return(
    <article key={index} className='message-card'>
      <a className="message-author">{author}</a> <span className="message-timestamp">{timestamp}</span>
      <p className="message-content">{content}</p>
    </article>
  )
}