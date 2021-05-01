import React, { useEffect, useState } from 'react'
import FriendList from '../friends/FriendList'

import '../../styles/components/Sidebar.css'
import SearchBar from '../Searchbar';
import axios from '../../axios';

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

  const noFriends = !friends || (friends && friends.length === 0)

  const getFriends = async () => {
    const response = await axios
      .get("api/user/1")
      .catch((err) => console.log("Error:", err));

    if (response && response.data) setFriends(response.data);
  }

  useEffect(() => {
    getFriends();
    console.log(friends)
  }, [])

  return (
    <aside className="sidebar">
      <div className="sidebar-stack">
        <div className="search-container">
          <SearchBar />
        </div>
        <StackItem>
          <h2 className="stack-title">Friends</h2>
          <FriendList className="stack-list" friends={friends} />
          <span className="stack-more">See more</span>
        </StackItem>
        <StackItem>
          <h2 className="stack-title">Suggestions</h2>
          <FriendList className="stack-list" friends={friends} />
          <span className="stack-more">See more</span>
        </StackItem>
      </div>
    </aside>
  )
}
