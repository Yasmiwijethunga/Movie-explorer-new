import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

// 🔑 Replace with your actual TMDB API key
const API_KEY = '1661898522a7fbc95d9a46a24ff55ce3';

// 📥 TMDB trending movie endpoint (weekly)
const TRENDING_API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'; // Base URL for movie images

/**
 * Home Page Component
 * -------------------
 * Displays the main landing view with a featured movie banner, trending movies carousel,
 * and promotional feature highlights.
 */
const Home = () => {
  const [movies, setMovies] = useState([]);            // 🎬 Trending movie list
  const [currentIndex, setCurrentIndex] = useState(0); // ▶️ Index for rotating banner

  // 🚀 Fetch trending movies on mount
  useEffect(() => {
    fetch(TRENDING_API)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          console.error('Unexpected API response:', data);
        }
      })
      .catch((err) => {
        console.error('Error fetching trending movies:', err);
      });
  }, []);

  // 🔁 Rotate banner movie every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval); // 🧼 Clean up on unmount
  }, [movies]);

  // 🖼️ Determine current banner background image
  const backgroundImage =
    movies.length > 0 && movies[currentIndex]?.backdrop_path
      ? `${IMAGE_BASE_URL}${movies[currentIndex].backdrop_path}`
      : '';

  return (
    <div className="page-container">
      
      <NavBar />
      <div className="home-wrapper">

        {/* 🎥 Featured Movie Banner */}
        <div
          className="overlay-banner"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            padding: '4rem 2rem',
          }}
        >
          <div className="content">
            {movies.length > 0 && (
              <>
                <h1>{movies[currentIndex]?.title}</h1>
                <p>{movies[currentIndex]?.overview}</p>
              </>
            )}
          </div>
        </div>

        {/* 🧭 Trending Movie Scroll */}
        <section className="movie-scroll">
          <h2>🔥 Top Trending Movies</h2>
          <div className="scroll-container">
            {movies.slice(0, 10).map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ App Feature Highlights */}
        <section className="reasons-section">
          <h2>🍿 Why Choose Movie Explorer?</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <h3>Watch on Your TV</h3>
              <p>Stream on Smart TVs, consoles, Chromecast, and more.</p>
            </div>
            <div className="reason-card">
              <h3>Offline Downloads</h3>
              <p>Download movies and shows to watch anytime, anywhere.</p>
            </div>
            <div className="reason-card">
              <h3>Stream Everywhere</h3>
              <p>Access from phone, tablet, laptop, or TV seamlessly.</p>
            </div>
            <div className="reason-card">
              <h3>Kid Profiles</h3>
              <p>Safe, fun spaces for kids to explore movies they love.</p>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Home;
