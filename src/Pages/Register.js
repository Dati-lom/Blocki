
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS



function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const headers = { 'Content-Type': 'application/json' };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const requestData = {
      username: username,
      password: password,
      email: email,
    };
    axios
      .post('https://blocking.somee.com/api/Auth/register', requestData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) navigate('/login');
      })
      .catch((error) => setError("Email or Username Already in use"));
  };

  return (
    <>
      <div className="container mt-5">
        <h2>Register</h2>
        <form onSubmit={submitHandle}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
  <label htmlFor="confirmPassword" className="form-label">
    Confirm Password
  </label>
  <input
    type="password"
    className="form-control"
    id="confirmPassword"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
</div>
{error && <div className="text-danger">{error}</div>}
          
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
