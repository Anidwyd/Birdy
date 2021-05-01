import React, { useEffect, useState } from 'react'
import axios from '../../../axios'
import MessageForm from '../../messages/MessageForm';
import MessageList from '../../messages/MessageList';

export default function Home() {
  const [messages, setMessages] = useState([])

  const noMessages = !messages || (messages && messages.length === 0)

  const getMessages = async () => {
    const response = await axios
      .get("messages")
      .catch((err) => console.log("Error: ", err));

    if (response && response.data) {
      setMessages(response.data);
      console.log(response.data)
    }
  }

  const addMessage = async (data) => {
    const response = await axios
      .post("messages", data)
      .catch((err) => console.log("Error: ", err));

    if (response) getMessages() // meh..
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
