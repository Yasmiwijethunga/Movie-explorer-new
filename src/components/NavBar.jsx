import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './NavBar.css';

export default function NavBar() {
  return (
    <div>
        {/* 🔝 Top Navigation Bar */}
      <nav className="navbar">
        <div className="logo">🎬 Movie Explorer</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/profile">
        <AccountCircle fontSize="large" style={{ color: 'white' }} />
      </Link> </li>
             
   
        </ul>
      </nav>
    </div>
  )
}
