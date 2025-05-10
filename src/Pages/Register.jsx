import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import bgImage from '../moviebackground.jpg';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Check if user already exists in localStorage
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      setError("An account with this email already exists.");
      return;
    }

    // Save user to localStorage
    const newUser = { username, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Registration successful! Please login.");
    navigate('/login');
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="auth-overlay" style={{ '--bg-url': `url(${bgImage})` }}>
        <div className="auth-container">
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Register</button>
            <p onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#eee' }}>
              Already have an account? Login
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
