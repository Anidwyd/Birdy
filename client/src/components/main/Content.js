import React from 'react'
import Header from './Header'

export default function Content({ title, component: Component }) {
  return (
    <>
      <Header title={title} />
      <div className="content">
        <Component />
      </div>
    </>
  )
}
