import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signUp } from '../../services/userService';
import './SignUp.css';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await signUp(username,password);

    if (response.status === 200) {
      alert("Successfully registered!!")
      const data = response.data;
      navigate("/");;
    } else {
      debugger;
      console.error('failed');
    }

  } catch (error) {
    alert("User already present");
    console.error('Error:', Error.message);
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
        <p>
          Already registered ? {' '}
          <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
