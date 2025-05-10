import React, { useState } from 'react';
import './Auth.css'; // Shared styles
import { useNavigate } from 'react-router-dom';
import bgImage from '../moviebackground.jpg';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Simulate frontend-only login (check against dummy user)
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Login successful!");
      localStorage.setItem("token", "dummy-token"); // simulate token
      navigate("/profile");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="auth-overlay" style={{ '--bg-url': `url(${bgImage})` }}>
        <div className="auth-container">
          <form className="auth-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
