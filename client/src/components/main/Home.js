import React, { useState } from 'react'
import MessageList from '../messages/MessageList';

export default function Home() {
  const [messages, setMessages] = useState([
    { author: 'Harold', content: '@juless https://tiktok.com/ahznefmklq', timestamp: '8s'},
    { author: 'Harold', content: 'adaaaaaaaam', timestamp: '8s'},
    { author: 'Harold', content: "@adam t'es ou bebouuuu", timestamp: '8s'},
    { author: 'Harold', content: 'pk la vie', timestamp: '9s' },
    { author: 'Jules', content: 'lorem ipsum...', timestamp: '2h' }
  ]);

  return (
    <div className="home">
      <MessageList messages={messages} />
    </div>
  )
}
