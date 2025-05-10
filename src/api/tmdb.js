import axios from "axios";

// Set your TMDb API Key here (keep this secure in production)
const API_KEY = "1661898522a7fbc95d9a46a24ff55ce3";
const  baseURL="https://api.themoviedb.org/3";
// Create a pre-configured Axios instance with TMDb base URL
const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY, // Default API key sent with every request
    language: "en-US", // Default language
  },
});

// Fetch a list of trending movies (weekly)
export const fetchTrendingMovies = async (page = 1) => {
  const response = await tmdb.get("/trending/movie/week", {
    params: { page },
  });
  return response.data.results; // Return only movie list
};

// Search for movies by title
export const searchMovies = async (query, page = 1) => {
  const response = await tmdb.get("/search/movie", {
    params: { query, page },
  });
  return response.data.results;
};

// Fetch single movie details by ID
export const fetchMovieDetails = async (id) => {
  const res = await axios.get(`${baseURL}/movie/${id}`, {
    params: {
      api_key: "1661898522a7fbc95d9a46a24ff55ce3",
      append_to_response: "videos", // Include trailer data
    },
  });
  return res.data;
};
export const fetchGenres = async () => {
  const response = await axios.get(`${baseURL}/genre/movie/list?api_key=${API_KEY}`);
  return response.data.genres;
};