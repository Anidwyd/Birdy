import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth } from '../../contexts/AuthContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import '../../styles/components/MessageForm.css'

export default function MessageForm() {
  const maxLength = 280;

  // TODO: remplacer ca par la liste des messages de la BD
  const messagesRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [length, setLength] = useState(maxLength);
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    const input = e.target.value;
    setFormValue(input);
    setLength(maxLength - input.length);
  }

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
          onChange={handleChange}
          minRows={1}
          placeholder="What's up?"/>
        <div className="msg-form-footer">
          {length < maxLength && 
          <div className="circular-bar-container">
            <CircularProgressbar
              value={maxLength-length}
              maxValue={maxLength}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: `${length > 0 ? "var(--clr-primary-400)" : "hsl(345, 83%, 54%)"}`,
                trailColor: 'var(--clr-bg-500)',
              })}
            />
          </div>}
          <button
            className="btn-primary msg-form-btn"
            disabled={!(formValue.replace(/(\r\n|\n|\r)/gm, "")) || length < 0}>
              Tweet
            </button>
        </div>
      </form>
    </div>
  );
}