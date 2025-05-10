import React, { useEffect, useState } from 'react';
import './Favorites.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  /**
   * Removes a movie from the favorites list
   * @param {number} id - Movie ID to be removed
   */
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== id);
    setFavorites(updatedFavorites); // Update state
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Persist to localStorage
  };

  // If no favorites are found, show message
  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h2>Your Favorite Movies</h2>
        <p>No favorites yet. Start adding some!</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <NavBar />

      <div className="favorites-container">
        <h2>Your Favorite Movies</h2>

        {/* Grid of favorite movie cards */}
        <div className="favorites-grid">
          {favorites.map(movie => (
            <div className="favorite-card" key={movie.id}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <button onClick={() => removeFromFavorites(movie.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
