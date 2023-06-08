import React from 'react';
import './Error.css';

const Error = () => {
  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-title">401 Unauthorized</h1>
      <p className="unauthorized-message">You are not authorized to access this page.</p>
    </div>
  );
};

export default Error;