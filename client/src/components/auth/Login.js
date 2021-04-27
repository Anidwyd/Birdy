import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Form, { FormGroup, FormButton, FormRouter } from '../Form';

import '../../css/layouts/auth.css'

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // try {
    //   setError("");
    //   setLoading(true);
    //   await login(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    // } catch {
    //   setError("Failed to log in");
    // }

    // setLoading(false);
  }

  return (
    <div className="auth-container" onSubmit={handleSubmit}>
      <Form title="Log in to Birdy">
        {error && <label>error</label>}
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