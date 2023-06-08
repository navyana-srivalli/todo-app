import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login/', {
        username,
        password,
      }, { withCredentials: true });
      if (response.status === 200) {
        const data = response.data;
        navigate("/todo");
      } else {
        alert('login failed')
        console.error('Login failed');
      }
    } catch (error) {
      alert('login failed')
      console.error('Error:', error.message);
    }
  };
  
  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            Not yet registered?{' '}
            <a href="/register">Register Now</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
