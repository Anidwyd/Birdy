import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import axios from '../../../axios'

import '../../../styles/components/Profile.css'
import MessageList from '../../messages/MessageList'
import Spacer from '../../Spacer'

export default function Profile() {
  const { currentUser } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const noMessages = !messages || (messages && messages.length === 0)

  const getUserMessages = async () => {
    setLoading(true)
    const response = await axios
      .get(`messages/user/${currentUser.user_id}`)
      .catch((err) => console.log("Error: ", err));

    if (response && response.data) {
      setMessages(response.data);
      console.log(response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUserMessages();
  }, [])

  return (
    <div className="profile">
      <div className="profile-infos">
        <span>
          <strong>{ currentUser.username }</strong><br />
          <strong>Email: </strong> { currentUser.email }
        </span>
        <Link to="/update-profile" className="link">Update Profile</Link>
      </div>
      <Spacer />
      {!noMessages ? <MessageList messages={messages} />
                   : loading ? <></>
                             : <h2 style={{textAlign: 'center', color: 'var(--clr-txt-500)'}}>It's calm in here...</h2>}
    </div>
  )
}
