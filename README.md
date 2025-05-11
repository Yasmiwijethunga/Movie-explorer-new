# Movie Explorer App 🎬

## Overview
A responsive movie discovery app using TMDb API. Features include search, trending, movie details, user login/register, profile, and dark/light mode.

## 🚀 Live Demo
 🔗 [https://movie-explorer-new.vercel.app]

## Features Implemented

- 🔐 User  (Login/Register)
- 🔍 Movie Search and Trending Movies
- 🔍 Movie sorting by popularity and rating
- 🎥 Movie Details Page with YouTube Trailer
- ⭐ Add to Favorites (stored in localStorage)
- 🎛️ Filter Movies by Genre, Year, and Rating
- 🌗 Light/Dark Theme Toggle
- 📱 Responsive UI using Material-UI
- 🔒 Protected Routes (Profile, Favorites)
- ⚠️ Error Handling for API and Network Issues

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://gitlab.com/yasmiwijethunga/movie-explorer-new
cd movie-explorer

Github: clone https://github.com/Yasmiwijethunga/Movie-explorer-new

2.Install_dependencies
  npm install

3. Run the app
    npm start

4.API Used
    TMDb API
    YouTube API 

5.REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here


6. 📂 Project Structure    

    src/
├── components/ # Reusable UI components
├── pages/ # Pages like Login, Register, Profile, Favorites
├── context/ # Global state (e.g., AuthContext)
├── services/ # API utilities (TMDb, YouTube)
├── App.jsx # Main routing and layout
└── index.js # Entry point

7.GitLab Repository Structure
    movie-explorer-new/
├── public/
│   └── index.html
├── src/
├── ├──api/tmdb.js  
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MovieCard.jsx
│   │   └── ... (other reusable UI components)
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Favorites.jsx
│   │   ├── MovieDetails.jsx
│   │   └── Home.jsx (and others..)
│   ├ 
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.js
│   └
├── .gitignore
├── README.md ✅ (see below)
├── package.json
└── package-lock.json


8.Folder Structure
    /src/components – Reusable UI
    /src.api 
    /src/pages – Page-level views



9. Technologies Used
React

React Router DOM

Material-UI (MUI)

Axios

TMDb API

YouTube Embed (optional)

Context API (Auth/Favorites)

LocalStorage for persistence