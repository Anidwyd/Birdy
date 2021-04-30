import React from 'react'

import '../styles/components/Alert.css'

export default function Alert({ variant, children }) {

  return (
    <div className={`alert alert-${ variant }`}>
      { children }
    </div>
  )
}
