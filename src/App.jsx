import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Favorites from "./Pages/Favorites";
import Login from "./Pages/Login";
import "./App.css";
import Register from "./Pages/Register";
import { ThemeProvider } from './themeContext';
import ThemeToggle from './components/ThemeToggle';
import ProtectedRoute from './components/ProtectedRoute';
import MovieDetails from "./Pages/MovieDetails";
import Profile from "./Pages/Profiles";

const App = ({ setMode, mode }) => {
  return (

   
     <Router>
      <ThemeToggle />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/profile" element={<Profile />} />
      </Routes>
    
      
      </Router>
    

   

    
  );
};

export default App;
