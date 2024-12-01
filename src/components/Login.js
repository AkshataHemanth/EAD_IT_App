import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const apiUrl = "https://xfbx83098c.execute-api.us-east-2.amazonaws.com/DEV/Login";  // Replace with your API Gateway endpoint

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the API Gateway
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "password": password })
      });

      // Check if response is not ok to catch server errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      if (response.status === 200) {
        console.log('Login Successful');
        setError('');
        navigate('/dashboard');  // Navigate to the Dashboard page
      }
    } catch (err) {
      console.error('Error:', err);
      // Display detailed error message
      setError(err.message || 'Failed to connect to server');
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/components/Signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
