import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1 className="signup-h1" id="signup-h1">Sign Up</h1>
      <form className="signup-form" id="signup-form" onSubmit={handleSubmit}>
        <label className="signup-label">
          <input
            className="signup-input"
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='error' id='signup-error'>{errors.email}</p>}
        <label className="signup-label">
          <input
            className="signup-input"
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='error' id='signup-error'>{errors.username}</p>}
        <label className="signup-label">
          <input
            className="signup-input"
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='error' id='signup-error'>{errors.firstName}</p>}
        <label className="signup-label">
          <input
            className="signup-input"
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='error' id='signup-error'>{errors.lastName}</p>}
        <label className="signup-label">
          <input
            className="signup-input"
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='error' id='signup-error'>{errors.password}</p>}
        <label className="signup-label">
          <input
            className="signup-input"
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className='error' id='signup-error'>{errors.confirmPassword}</p>
        )}
        <button className='signup-button' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;