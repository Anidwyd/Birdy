import React, { useEffect, useState } from 'react'
import axios from '../../../axios'
import MessageForm from '../../messages/MessageForm';
import MessageList from '../../messages/MessageList';

export default function Home() {
  const [messages, setMessages] = useState([
    { author: 'Harold', content: 'mattez moi ca les juless https://tiktok.com/ahznefmklq', timestamp: '8s', comments: '2', likes: '-666' },
    { author: 'Harold', content: 'adaaaaaaaam', timestamp: '8s', comments: '12', likes: '8' },
    { author: 'Harold', content: "adam t'es ou bebouuuu", timestamp: '8s', comments: '1', likes: '0' },
    { author: 'Harold', content: 'pk la vie', timestamp: '9s', comments: '3', likes: '2'},
    { author: 'Jules', content: 'lorem ipsum...', timestamp: '2h', comments: '200k', likes: '128k'} ])

  const noMessages = !messages || (messages && messages.length === 0)

  const getMessages = async () => {
    const response = await axios
      .get("api/messages")
      .catch((err) => console.log("Error friends:", err));

    if (response && response.data) setMessages(response.data);
  }

  const addMessage = async (data) => {
    // const response = await axios
    //   .post("/messages", data)
    //   .catch((err) => { console.log("Error: ", err)});

    // if (response)
    setMessages([data, ...messages])
    console.log(messages)
  }

  useEffect(() => {
    getMessages();
  }, [])

  return (
    <div className="home">
      <MessageForm addMessage={addMessage} />
      <div className="home-spacer"></div>
      {noMessages ? <h2 style={{textAlign: 'center'}}>It's calm in here...</h2>
                  : <MessageList messages={messages} />}
    </div>
  )
}
