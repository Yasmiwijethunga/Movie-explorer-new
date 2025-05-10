// src/themeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a context to hold theme state
export const ThemeContext = createContext();

// ThemeProvider to wrap the app and provide current theme and toggler
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load previously saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Function to toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme ,}}>
      {children}
    </ThemeContext.Provider>
  );
};
