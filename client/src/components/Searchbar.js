import React from 'react'

import '../styles/components/SearchBar.css'

import { ReactComponent as SearchIcon } from '../icons/search.svg'

export default function SearchBar() {
  return (
    <form>
      <div className="searchbar input">
        <span className="search-icon"><SearchIcon /></span>
        <input type="text" class="search-input" placeholder="Search..." />
      </div>
    </form>
  );
}
