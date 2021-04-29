import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth } from '../../contexts/AuthContext';

import '../../styles/components/MessageForm.css'

export default function MessageForm() {

  // TODO: remplacer ca par la liste des messages de la BD
  const messagesRef = useRef();
  const [formValue, setFormValue] = useState('');
  const { currentUser } = useAuth();

  const sendMessage = async(e) => {
    e.preventDefault();
    /*
    const { uid } = currentUser;

    // blabla
    await messagesRef.add({
      text: formValue,
      createdAt: uid // plus le temps jimagine
    });*/

    setFormValue('');
  }

  return (
    <div className="new-msg-container">
      <form onSubmit={sendMessage}>
        <TextareaAutosize
          className="msg-input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          minRows={1}
          placeholder="What's up?"/>
        <div className="msg-form-footer">
          <button
            className="btn-primary msg-form-btn"
            disabled={!(formValue.replace(/(\r\n|\n|\r)/gm, ""))}>Tweet</button>
        </div>
      </form>
    </div>
  )
}