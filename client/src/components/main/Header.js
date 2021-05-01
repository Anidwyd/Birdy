import React from 'react'

import '../../styles/components/Header.css'

export default function Header({ title }) {
  return (
    <header className="header noselect">
      <h2>{title}</h2>
    </header>
  )
}
