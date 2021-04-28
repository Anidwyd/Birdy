import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import Form, { FormGroup, FormButton, FormRouter, FormInlineGroup } from '../Form';

import '../../styles/layouts/auth.css'

export default function Signup() {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    history.push("/");

    // try {
    //   setError("");
    //   setLoading(true);

    //   await signup(
    //     firstnameRef.current.value,
    //     lastnameRef.current.value,
    //     emailRef.current.value,
    //     passwordRef.current.value
    //   );

    //   history.push("/")
    // } catch {
    //   setError("Failed to log in");
    // }

    // setLoading(false);
  }

  return (
    <div className="auth-container">
      <Form title="Sign up to Birdy" onSubmit={handleSubmit}>
        {error && <label>error</label>}
        <FormInlineGroup>
          <FormGroup id="firstname" type="text" ref={emailRef} placeholder="Jack" required>Firstname</FormGroup>
          <FormGroup id="lastname" type="text" ref={emailRef} placeholder="Bauer" required>Lastname</FormGroup>
        </FormInlineGroup>
        <FormGroup id="username" type="text" ref={usernameRef} placeholder="Enter username (the @ thing !)" required>Username</FormGroup>
        <FormGroup id="email" type="email" ref={emailRef} placeholder="Enter email" required>Email</FormGroup>
        <FormGroup id="password" type="password" ref={passwordRef} placeholder="Enter password" required>Password</FormGroup>
        <FormGroup id="password" type="password" ref={passwordConfirmRef} placeholder="Repeat password" required>Confirm password</FormGroup>
        <FormButton disabled={loading} onClick={() => {}}>Sign Up</FormButton>
        <FormRouter value="Already have an account? " to="/login">Log In</FormRouter>
      </Form>
    </div>
  )
}