import React, { useState } from 'react'

import '../../styles/components/Reaction.css'

export default function Reaction({ icon, variant, children, like }) {

  const [toggled, setToggle] = useState(false);

  const className = `
    reaction-btn
    ${variant ? `${variant}` : "primary"}-reaction
    ${toggled ? "toggled" : ""}
  `;

  const handleClick = () => {
    setToggle(!toggled)
    if (like)
      like()
  }

  return (
    <div className="reaction noselect">
      <span
        className={className}
        onClick={handleClick}>
        { icon }
        { children }
      </span>
    </div>
  );
}