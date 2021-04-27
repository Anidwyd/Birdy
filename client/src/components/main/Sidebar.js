import React, { useState } from 'react'
import FriendList from '../friends/FriendList'

export default function Sidebar() {
  const [friends, setFriends] = useState([
    { username: 'michmich' },
    { username: 'fred' },
    { username: 'pikachu' }
  ]);

  function StackItem(props) {
    return (
      <div className="stack-item">
        { props.children }
      </div>
    )
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-stack">
        <StackItem>
          <h2 className="stack-title">Friend</h2>
          <FriendList className="stack-list" friends={friends} />
          <span className="stack-more">See more</span>
        </StackItem>
      </div>
    </aside>
  )
}
