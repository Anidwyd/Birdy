import React, { useEffect, useState } from 'react'
import UserList from '../users/UserList'

import '../../styles/components/Sidebar.css'
import SearchBar from '../Searchbar';
import axios from '../../axios';

export default function Sidebar() {
  const [friends, setFriends] = useState([
    { firstname: 'Jean', lastname: 'Castout' },
    { firstname: 'Emmanuel', lastname: 'Macon' },
    { firstname: 'Christophe', lastname: 'Castamère' },
    { firstname: 'Jean-Michel', lastname: 'Blancoeur' }
  ]);

  const [suggestions, setSuggestions] = useState([])

  const noSuggestions = !suggestions || (suggestions && suggestions.length === 0)

  const getSuggestions = async () => {
    const response = await axios
      .get("user")
      .catch((err) => console.log("Error: ", err));

    if (response && response.data) {
      setSuggestions(response.data);
      console.log(response.data)
    }
  }

  function StackItem(props) {
    return (
      <div className="stack-item">
        { props.children }
      </div>
    )
  }

  useEffect(() => {
    getSuggestions();
  }, [])

  return (
    <aside className="sidebar">
      <div className="sidebar-stack">
        <div className="search-container">
          <SearchBar />
        </div>
        <StackItem>
          <h2 className="stack-title">Friends</h2>
          <UserList className="stack-list" users={friends} />
          <span className="stack-more">See more</span>
        </StackItem>
        <StackItem>
          <h2 className="stack-title">Suggestions</h2>
          {noSuggestions
              ? <h4 style={{textAlign: 'center', color: 'var(--clr-txt-500)', fontWeight: '500'}}>No suggestions</h4>
              : <>
                  <UserList className="stack-list" users={suggestions} />
                  <span className="stack-more">See more</span>
                </>}
        </StackItem>
      </div>
    </aside>
  )
}
