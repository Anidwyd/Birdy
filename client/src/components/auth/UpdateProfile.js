import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import Form, { FormGroup, FormButton, FormRouter } from '../Form';

import '../../css/layouts/auth.css'

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      history.push("/");
    }).catch(() => {
      setError('Failed to update account.')
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="auth-container">
      <Form title="Update Profile" onSubmit={handleSubmit}>
        {error && <label>error</label>}
        <FormGroup
          id="email"
          type="email"
          ref={emailRef}
          placeholder="Enter new email"
          required
          defaultValue={"gege@gmail.com"}>
            Email
          </FormGroup>
        <FormGroup id="password" type="password" ref={passwordRef} placeholder="Enter new password">Password</FormGroup>
        <FormGroup id="password" type="password" ref={passwordConfirmRef} placeholder="Repeat new password">Confirm password</FormGroup>
        <FormButton disabled={loading}>Update</FormButton>
        <FormRouter value="Nah, I'm good actually! " to="/">Cancel</FormRouter>
      </Form>
    </div>
  )
}