import React, { useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ThemeContext } from "../themeContext"; // Custom theme context for light/dark mode

// FiltersBar Component: used to filter movie results by genre, year, rating, and sort order
const FiltersBar = ({
  genres,           // List of genres fetched from API
  selectedGenre,    // Currently selected genre ID
  setSelectedGenre, // Function to update selected genre
  year,             // Selected release year
  setYear,          // Function to update year
  rating,           // Selected minimum rating
  setRating,        // Function to update rating
  sortOrder,        // Selected sort order
  setSortOrder,     // Function to update sort order
  onClearFilters,   // Callback to reset all filters
}) => {
  const { theme } = useContext(ThemeContext); // Get theme from context
  const isDark = theme === "dark"; // Determine if theme is dark

  const labelColor = isDark ? "#ccc" : "#000"; // Label color based on theme

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        mt: 2,
        mb: 2,
        backgroundColor: isDark ? "#222" : "#f5f5f5", // Background based on theme
        p: 2,
        borderRadius: 2,
      }}
    >
      {/* Genre Dropdown */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel sx={{ color: labelColor }}>Genre</InputLabel>
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          label="Genre"
          sx={{
            backgroundColor: isDark ? "#333" : "#fff",
            color: isDark ? "#fff" : "#000",
          }}
        >
          <MenuItem value="">All</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Year Dropdown */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel sx={{ color: labelColor }}>Year</InputLabel>
        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          label="Year"
          sx={{
            backgroundColor: isDark ? "#333" : "#fff",
            color: isDark ? "#fff" : "#000",
          }}
        >
          <MenuItem value="">All</MenuItem>
          {/* Generate last 25 years dynamically */}
          {Array.from({ length: 25 }, (_, i) => 2024 - i).map((yr) => (
            <MenuItem key={yr} value={yr.toString()}>
              {yr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rating Dropdown */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel sx={{ color: labelColor }}>Min Rating</InputLabel>
        <Select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          label="Min Rating"
          sx={{
            backgroundColor: isDark ? "#333" : "#fff",
            color: isDark ? "#fff" : "#000",
          }}
        >
          <MenuItem value="">All</MenuItem>
          {/* Ratings from 1 to 10 */}
          {[...Array(10)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}+
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sort Order Dropdown */}
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel sx={{ color: labelColor }}>Sort By</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Sort By"
          sx={{
            backgroundColor: isDark ? "#333" : "#fff",
            color: isDark ? "#fff" : "#000",
          }}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>

      {/* Clear Filters Button */}
      <Button variant="outlined" color="secondary" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </Box>
  );
};

export default FiltersBar;
