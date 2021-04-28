import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import '../../styles/components/MessageForm.css'

export default function MessageForm(props){
  return (
    <div className="new-msg-container">
      <form className="msg-form">
        <TextareaAutosize className="msg-input" minRows={1} placeholder="What's up?"/>
        <div className="msg-form-footer">
          <button className="btn-primary msg-form-btn">Tweet</button>
        </div>
      </form>
    </div>
  )
}