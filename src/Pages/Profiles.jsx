// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import './Profiles.css'; // Custom styling for the Profile page
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Profile = () => {
  // State to store user info from localStorage
  const [user, setUser] = useState(null);

  // Flag to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Form state to handle editable profile fields
  const [formData, setFormData] = useState({
    fullName: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    timeZone: '',
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      // Redirect to login if no user is found
      window.location.href = '/login';
    } else {
      setUser(storedUser);
      // Populate form fields with user data
      setFormData(prev => ({
        ...prev,
        fullName: storedUser.fullName || '',
        nickName: storedUser.nickName || '',
        gender: storedUser.gender || '',
        country: storedUser.country || '',
        language: storedUser.language || '',
        timeZone: storedUser.timeZone || '',
      }));
    }
  }, []);

  // Handle logout: clear localStorage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save edited profile data back to localStorage
  const handleSave = () => {
    setIsEditing(false);
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Handle avatar upload and conversion to Base64
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, avatar: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  // Show loading while user data is being retrieved
  if (!user) return <div className="profile-container">Loading...</div>;

  return (
    <div className="page-container">
        
      <NavBar />
      <div className="profile-container">
        {/* Header section with greeting and logout button */}
        <div className="profile-header">
          <h2>Welcome, {user.username}</h2>
          
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* Profile Card Section */}
        <div className="profile-card">
          {/* Avatar Section */}
          <div className="profile-avatar">
            <label htmlFor="avatar-upload">
              <img
                src={user.avatar || 'https://i.pravatar.cc/100?u=user'}
                alt="avatar"
                className="avatar-image"
              />
            </label>
            <input
              type="file"
              id="avatar-upload"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <div>
              <h3>{user.fullName || 'Your Full Name'}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="profile-fields">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <input
              type="text"
              name="nickName"
              placeholder="Nick Name"
              value={formData.nickName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="">Country</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="">Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
            </select>
            <select
              name="timeZone"
              value={formData.timeZone}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="">Time Zone</option>
              <option value="UTC+5:30">UTC+5:30</option>
              <option value="UTC-5">UTC-5</option>
            </select>
          </div>

          {/* Email info section */}
          <div className="email-section">
            <h4>My Email Address</h4>
            <div className="email-item">
              <span className="email-icon">📧</span>
              <span>{user.email}</span>
              <span className="email-date">1 month ago</span>
            </div>
          </div>

          {/* Edit/Save Button */}
          <div className="profile-actions">
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
