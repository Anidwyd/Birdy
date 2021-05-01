import React from 'react';
import Reaction from './Reaction';

import { ReactComponent as CommentIcon } from '../../icons/comment.svg'
import { ReactComponent as LikeIcon } from '../../icons/like.svg'
import { ReactComponent as BookmarkIcon } from '../../icons/bookmark.svg'

import '../../styles/components/Message.css'

export default function Message({ index, author_name, content, date, comments, likes }) {

  const getElapsedTime = (date) => {
    let postTime = new Date(date);
    let currTime = new Date();

    let timeDiff = currTime - postTime;

    timeDiff /= 1000;
    let seconds = Math.round(timeDiff % 60)
    
    timeDiff = Math.floor(timeDiff / 60);
    let minutes = Math.round(timeDiff % 60);
    if (minutes <= 0) return seconds + "s";

    timeDiff = Math.floor(timeDiff / 60);
    let hours = Math.round(timeDiff % 24);

    if (hours <= 0) return minutes + "m";

    timeDiff = Math.floor(timeDiff / 24);
    let days = timeDiff;

    if (days <= 0) return hours + "h";

    return days + 'd';
  }
  
  return (
    <article key={index} className='msg-card'>
      <div className="msg-header">
        <span className="msg-author">{author_name}</span>
        <span className="msg-timestamp">{getElapsedTime(date)}</span>
      </div>
      <div className="msg-body">{content}</div>
      <footer className="msg-footer">
        <Reaction icon={<CommentIcon />} >{ comments }</Reaction>
        <Reaction icon={<LikeIcon />} variant="like" >{ likes }</Reaction>
        <Reaction icon={<BookmarkIcon />} variant="bookmark" />
      </footer>
    </article>
  )
}