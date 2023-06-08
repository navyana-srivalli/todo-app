import React from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';

const Header = ({isLoggedin}) => {

  console.log(isLoggedin);

  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "";
    navigate("/")
  }

  return (
    <div className='header'>
        <button className='sign-button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
