import React, { useState } from 'react';
import MovieList from './MovieList';

const App = () => {
  // Hardcoded movie data
  const movies = [
    { 
      title: 'Inception', 
      poster: '/images/p-1.jpg', 
      year: 2010, 
      description: 'A mind-bending thriller', 
      rating: '8.8' 
    },
    { 
      title: 'The Dark Knight', 
      poster: '/images/p-2.jpeg', 
      year: 2008, 
      description: 'Batman faces his greatest challenge', 
      rating: '9.0' 
    },
    { 
      title: 'The Matrix', 
      poster: '/images/p-3.jpeg', 
      year: 1999, 
      description: 'A hacker discovers the truth about reality', 
      rating: '8.7' 
    },
    { 
      title: 'Interstellar', 
      poster: '/images/p-4.jpg', 
      year: 2014, 
      description: 'Space travel to save humanity', 
      rating: '8.6' 
    },
  ];
  

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      
      {/* Search Input */}
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Search for a movie..." 
      />
      
      {/* Movie List Display */}
      <MovieList movies={filteredMovies} onMovieClick={handleMovieClick} />

      {/* Movie Details */}
      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.title} ({selectedMovie.year})</h2>
          <p>{selectedMovie.description}</p>
          <p>Rating: {selectedMovie.rating}</p>
        </div>
      )}
    </div>
  );
};

export default App;
