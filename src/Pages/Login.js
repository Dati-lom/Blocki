import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TokenContext from '../Context/TokenContext';

function Login({ setLogged }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { token, setToken,curUser,setCurUser } = useContext(TokenContext);
  const [error, setError] = useState('');

  const submitHandle = async (e) => {
    e.preventDefault();
    const requestData = {
      email: email,
      password: password,
    };
    axios
      .post('https://blocking.somee.com/api/Auth/login', requestData)
      .then((response) => {
        if(response.status === 200){
          console.log("IN 200");
          if (response.data.blocked == true) 
            setError('User Is Blocked');
          else{
            setToken(response.data.token);
            setCurUser(response.data.id)
            setLogged(true);
            navigate('/MainPage');
          }
        }
      }).catch((error)=>setError('Incorrect email or password'));
  };

  return (
    <>
      <div className="container mt-5">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
