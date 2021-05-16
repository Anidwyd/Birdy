import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import Form, { FormGroup, FormButton, FormRouter, FormInlineGroup } from '../Form';

import '../../styles/layouts/auth.css'
import Alert from '../Alert';

export default function Signup() {
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("");
      setLoading(true);
      await signup(firstnameRef.current.value, lastnameRef.current.value, emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign up")
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <Form title="Sign up to Birdy" onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormInlineGroup>
          <FormGroup id="firstname" type="text" ref={firstnameRef} placeholder="Jack" required>Firstname</FormGroup>
          <FormGroup id="lastname" type="text" ref={lastnameRef} placeholder="Bauer" required>Lastname</FormGroup>
        </FormInlineGroup>
        <FormGroup id="email" type="email" ref={emailRef} placeholder="Enter email" required>Email</FormGroup>
        <FormGroup id="password" type="password" ref={passwordRef} placeholder="Enter password" required>Password</FormGroup>
        <FormGroup id="password-confirm" type="password" ref={passwordConfirmRef} placeholder="Repeat password" required>Confirm password</FormGroup>
        <FormButton disabled={loading}>Sign Up</FormButton>
        <FormRouter value="Already have an account? " to="/login">Log In</FormRouter>
      </Form>
    </div>
  )
}