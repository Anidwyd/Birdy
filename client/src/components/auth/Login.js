import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Form, { FormGroup, FormButton, FormRouter } from '../Form';

import '../../styles/layouts/auth.css'
import Alert from '../Alert';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(emailRef.current.value)

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <Form title="Log in to Birdy" onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormGroup id="email" type="email" ref={emailRef} placeholder="Enter email" required>Email</FormGroup>
        <FormGroup id="password" type="password" ref={passwordRef} placeholder="Enter password" required>
          Password
          <Link className="link forgot-pwd-link" to="/forgot-password">Forgot password?</Link>
        </FormGroup>
        <FormButton disabled={loading}>Log in</FormButton>
        <FormRouter value="Not registered yet? " to="/signup">Sign up</FormRouter>
      </Form>
    </div>
  )
}