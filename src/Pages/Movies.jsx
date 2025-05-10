import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import FiltersBar from "../components/FilterBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { ThemeContext } from "../themeContext";
import "./Movies.css";
import {
  fetchTrendingMovies,
  searchMovies,
  fetchGenres,
} from "../api/tmdb";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Movies = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  // Local state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState(""); // current search text
  const [page, setPage] = useState(1); // current page for API
  const [hasMore, setHasMore] = useState(true); // if more results exist

  // Filters
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    loadGenres();
    const lastSearch = localStorage.getItem("lastSearch");

    if (lastSearch) {
      setQuery(lastSearch);
      setSearchMode(true);
      fetchMovies(true, lastSearch, 1); // Load first page of last search
    } else {
      fetchMovies(true); // Initial trending fetch
    }
  }, []);

  // Fetch genres once
  const loadGenres = async () => {
    try {
      const genreList = await fetchGenres();
      setGenres(genreList);
    } catch (err) {
      console.error("Failed to fetch genres", err);
    }
  };

  // Fetch movies (trending or search), with paging
  const fetchMovies = async (isNewSearch = false, searchQuery = query, currentPage = page) => {
    setLoading(true);
    try {
      const nextPage = isNewSearch ? 1 : currentPage;
      const results = searchMode || searchQuery
        ? await searchMovies(searchQuery, nextPage)
        : await fetchTrendingMovies(nextPage);

      // If starting new search/trending load, replace movies
      if (isNewSearch) {
        setMovies(results);
        setPage(2); // next page
        setHasMore(results.length > 0);
      } else {
        setMovies((prev) => [...prev, ...results]);
        setPage((prev) => prev + 1);
        setHasMore(results.length > 0);
      }
    } catch (err) {
      console.error("Failed to load movies", err);
    } finally {
      setLoading(false);
    }
  };

  // Search handler
  const handleSearch = (searchText) => {
    if (!searchText.trim()) return;
    setSearchMode(true);
    setQuery(searchText);
    localStorage.setItem("lastSearch", searchText);
    fetchMovies(true, searchText, 1); // new search
  };

  // Filters
  const applyFilters = () => {
    let filtered = [...movies];
    if (selectedGenre)
      filtered = filtered.filter((movie) =>
        movie.genre_ids?.includes(parseInt(selectedGenre))
      );
    if (selectedYear)
      filtered = filtered.filter((movie) =>
        movie.release_date?.startsWith(selectedYear)
      );
    if (selectedRating)
      filtered = filtered.filter(
        (movie) => movie.vote_average >= selectedRating
      );
    if (sortOption === "popularity")
      filtered.sort((a, b) => b.popularity - a.popularity);
    else if (sortOption === "rating")
      filtered.sort((a, b) => b.vote_average - a.vote_average);
    return filtered;
  };

  const clearFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating("");
    setSortOption("");
  };

  return (
   <div className="page-container">
    
      <NavBar />
      <div className={`movies-container ${isDarkTheme ? "dark" : "light"}`}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {searchMode ? "Search Results" : "Trending Movies"}
        </Typography>

        <SearchBar onSearch={handleSearch} />

        <FiltersBar
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          year={selectedYear}
          setYear={setSelectedYear}
          rating={selectedRating}
          setRating={setSelectedRating}
          sortOrder={sortOption}
          setSortOrder={setSortOption}
          onClearFilters={clearFilters}
        />

        <div style={{ minHeight: "70vh" }}>
          {loading && movies.length === 0 ? (
            <LoadingSpinner message="Fetching movies..." />
          ) : (
            <>
              <Grid container spacing={2}>
                {applyFilters().map((movie) => (
                  <Grid item key={movie.id}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>

              {/* Load More button */}
              {hasMore && !loading && (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchMovies(false)}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
