import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Form, { FormGroup, FormButton, FormRouter } from '../Form';

import '../../styles/layouts/auth.css'
import Alert from '../Alert';

export default function ForgotPassword() {
  const emailRef = useRef();
  
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('')
      setError('');
      setLoading(true);
      await resetPassword(/*emailRef.current.value*/);
      setMessage('Check your inbox for further instructions!')
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  }

  return (
    <div className="auth-container" onSubmit={handleSubmit}>
      <Form title="Password Reset">
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <FormGroup id="email" type="email" ref={emailRef} placeholder="Enter email" required>Email</FormGroup>
        <FormButton disabled={loading}>Reset password</FormButton>
        <FormRouter value="Remembered just now? " to="/login">Log in</FormRouter>
      </Form>
    </div>
  )
}
