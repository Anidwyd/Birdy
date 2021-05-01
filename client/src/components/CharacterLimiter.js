import React from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

export default function CharacterLimiter({ value, maxValue }) {

  const styles = buildStyles({
    strokeLinecap: 'round',
    pathColor: `${value <= 0
      ? "var(--clr-red-400)"
      : `${value <= 20
        ? "var(--clr-orange-400)"
        : "var(--clr-primary-400)"
        }`
      }`,
    trailColor: 'var(--clr-bg-500)'
  });

  return (
    <div className="limiter-container">
      <div className={`limiter ${value <= 20 ? 'exceeded' : 'safe'}`}>
        <CircularProgressbarWithChildren
          value={maxValue-value}
          maxValue={maxValue}
          styles={styles}>
            {value <= 20 &&
              <span className="limiter-inside-text" style={{color: `${value > 0 ? "var(--clr-txt-500)" : "var(--clr-red-400)"}`}
              }>{value}</span>
            }
          </CircularProgressbarWithChildren>
      </div>
    </div>
  )
}
