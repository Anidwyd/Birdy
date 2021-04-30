import React, { useState } from 'react'

import '../../styles/components/Reaction.css'

export default function Reaction({ icon, variant, children }) {

  const [toggled, setToggle] = useState(false);

  const className = `
    reaction-btn
    ${variant ? `${variant}` : "primary"}-reaction
    ${toggled ? "toggled" : ""}
  `;

  return (
    <div className="reaction noselect">
      <span
        className={className}
        onClick={() => setToggle(!toggled)}>
        { icon }
        { children }
      </span>
    </div>
  );
}