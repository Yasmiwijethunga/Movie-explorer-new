import React, { useContext, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../themeContext";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // Holds current search input
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Trigger search if query is not empty
  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Search for movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
      InputProps={{
        style: {
          backgroundColor: isDark ? "#333" : "#fff", // Dark/light theme background
          color: isDark ? "#fff" : "#000",            // Input text color
        },
        endAdornment: (
          <InputAdornment position="end">
            {/* Search icon button */}
            <IconButton
              onClick={handleSearch}
              edge="end"
              sx={{ color: isDark ? "#fff" : "#000" }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 2,
        input: { color: isDark ? "#fff" : "#000" },   // Text color for cursor/typing
        label: { color: isDark ? "#ccc" : "#000" },   // Label color if used
      }}
    />
  );
};

export default SearchBar;
