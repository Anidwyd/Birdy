import React, { useState } from 'react'

import '../../styles/components/Reaction.css'

export default function Reaction(props) {

  const [isToggled, setToggle] = useState(false);

  return (
    <div className="reaction noselect">
      <span
        className={`reaction-btn ${isToggled ? "toggled" : ""}`}
        onClick={() => setToggle(!isToggled)}>
        { props.icon }
        { props.children }
      </span>
    </div>
  );
}