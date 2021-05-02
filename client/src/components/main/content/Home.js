import React, { useEffect, useState } from 'react'
import axios from '../../../axios'
import MessageForm from '../../messages/MessageForm';
import MessageList from '../../messages/MessageList';
import Spacer from '../../Spacer';

export default function Home() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const noMessages = !messages || (messages && messages.length === 0)

  const getMessages = async () => {
    setLoading(true)
    const response = await axios
      .get("messages")
      .catch((err) => console.log("Error: ", err));

    if (response && response.data) {
      setMessages(response.data);
      console.log(response.data)
    }
    setLoading(false)
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
      <Spacer />
      {!noMessages ? <MessageList messages={messages} />
                   : loading ? <></>
                             : <h2 style={{textAlign: 'center', color: 'var(--clr-txt-500)'}}>It's calm in here...</h2>}
    </div>
  )
}
