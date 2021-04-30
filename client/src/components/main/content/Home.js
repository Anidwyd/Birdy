import React, { useState } from 'react'
import MessageForm from '../../messages/MessageForm';
import MessageList from '../../messages/MessageList';

export default function Home() {
  const [messages, setMessages] = useState([
    { author: 'Harold', content: 'mattez moi ca les juless https://tiktok.com/ahznefmklq', timestamp: '8s', comments: '2', likes: '-666' },
    { author: 'Harold', content: 'adaaaaaaaam', timestamp: '8s', comments: '12', likes: '8' },
    { author: 'Harold', content: "adam t'es ou bebouuuu", timestamp: '8s', comments: '1', likes: '0' },
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Jules', content: 'lorem ipsum...', timestamp: '2h', comments: '200k', likes: '128k'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'}
  ]);

  return (
    <div className="home">
      <MessageForm />
      <div className="home-spacer"></div>
      <MessageList messages={messages} />
    </div>
  )
}
