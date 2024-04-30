// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1 className='log-in-header' id='log-in-header'>Log In</h1>
      <form className='log-in-form' id='log-in-form' onSubmit={handleSubmit}>
        <label className='log-in-label' id='log-in-label'>
          <input
            type="text"
            className='log-in-input'
            id='log-in-input'
            placeholder='Username or Email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='log-in-label' id='log-in-label'>
          <input
            type="password"
            className='log-in-input'
            id='log-in-input'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className='error' id='error-log-in'>{errors.credential}</p>
        )}
        <button type="submit" className='log-in-submit' id='log-in-submit'>Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;