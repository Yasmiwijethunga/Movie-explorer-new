import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import {
  Typography,
  CircularProgress,
  Button,
  Paper,
  Box,
  Snackbar,
} from "@mui/material";

import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);

  // 🔐 Redirect to login if not authenticated
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // 🎬 Fetch movie details and trailer
  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);

        // 🎞️ Extract YouTube trailer
        const trailers = data.videos?.results?.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  // 💾 Add movie to favorites
  const addToFavorites = (movie) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = [...existing.filter((m) => m.id !== movie.id), movie];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setSnackOpen(true);
  };

  // 🕑 Loading spinner
  if (loading) {
    return (
      <div className="details-loading">
        <CircularProgress />
      </div>
    );
  }

  // ❌ Not found fallback
  if (!movie) {
    return (
      <div className="details-container">
        <Typography variant="h5">Movie not found.</Typography>
      </div>
    );
  }

  return (
    <div className="page-container">
      <NavBar />

      <div className="details-container">
        <Paper elevation={3} className="details-card">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/fallback-poster.png" // 🔄 Fallback image if poster is missing
            }
            alt={movie.title}
            className="details-poster"
          />

          <Box className="details-info">
            <Typography variant="h4" gutterBottom>
              {movie.title}
            </Typography>

            {/* 🏷️ Display genres */}
            {movie.genres?.length > 0 && (
              <Typography variant="body2" sx={{ mb: 1, fontStyle: "italic" }}>
                Genres: {movie.genres.map((g) => g.name).join(", ")}
              </Typography>
            )}

            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Rating: {movie.vote_average} ⭐ | Release Date: {movie.release_date}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                sx={{ mr: 2 }}
              >
                Go Back
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => addToFavorites(movie)}
              >
                Add to Favorites
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* 🎬 Trailer Section */}
        {trailerKey && (
          <Box className="trailer-section">
            <Typography variant="h5" sx={{ mb: 2 }}>
              Watch Trailer
            </Typography>
            <div className="trailer-iframe-wrapper">
              <iframe
                title={`${movie.title} Trailer`}
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="trailer-iframe"
              ></iframe>
            </div>
          </Box>
        )}
      </div>

      {/* ✅ Snackbar for feedback */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message="Added to Favorites"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <Footer />
    </div>
  );
};

export default MovieDetails;
