import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Handler to navigate to movie details page
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card
      // MUI card with fixed width, margin, and background
      sx={{ width: 200, m: 1, backgroundColor: "background.paper" }}
      onClick={handleClick}
    >
      <CardActionArea>
        {/* Poster image of the movie */}
        <CardMedia
          component="img"
          height="300"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // Poster from TMDb
              : "https://via.placeholder.com/200x300?text=No+Image"   // Placeholder if no image
          }
          alt={movie.title}
        />

        {/* Content section with title, release year, and rating */}
        <CardContent>
          {/* Movie title (truncated if too long) */}
          <Typography variant="subtitle1" noWrap>
            {movie.title}
          </Typography>

          {/* Release year extracted from release date */}
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.split("-")[0]}
          </Typography>

          {/* Rating (converts 10-point TMDb scale to 5-star format) */}
          <Rating
            name="read-only"
            value={movie.vote_average / 2}
            readOnly
            precision={0.5}
            size="small"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
