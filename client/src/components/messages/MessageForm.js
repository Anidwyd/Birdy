import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth } from '../../contexts/AuthContext';
import CharacterLimiter from '../CharacterLimiter'

import '../../styles/components/MessageForm.css'

export default function MessageForm({ addMessage }) {
  const maxLength = 144;

  // TODO: remplacer ca par la liste des messages de la BD
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

    const data = {
      user_id: 2,
      author_name: 'Harold',
      content: formValue,
    }

    addMessage(data)
    setFormValue('');
    setLength(maxLength);
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
          {length < maxLength && <CharacterLimiter value={length} maxValue={maxLength} />}
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