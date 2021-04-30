import React from 'react';
import Reaction from './Reaction';

import { ReactComponent as CommentIcon } from '../../icons/comment.svg'
import { ReactComponent as LikeIcon } from '../../icons/like.svg'
import { ReactComponent as BookmarkIcon } from '../../icons/bookmark.svg'

import '../../styles/components/Message.css'

export default function Message({ index, author, content, timestamp, comments, likes }){
  return (
    <article key={index} className='msg-card'>
      <div className="msg-header">
        <span className="msg-author">{author}</span>
        <span className="msg-timestamp">{timestamp}</span>
      </div>
      <div className="msg-body">
        <span className="msg-content">{content}</span>
      </div>
      <footer className="msg-footer">
        <Reaction icon={<CommentIcon />} >{ comments }</Reaction>
        <Reaction icon={<LikeIcon />} variant="like" >{ likes }</Reaction>
        <Reaction icon={<BookmarkIcon />} variant="bookmark" />
      </footer>
    </article>
  )
}