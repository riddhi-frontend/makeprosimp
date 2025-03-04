import React from "react";
const MovieList = ( {movies, onMovieClick}) => {
    return (
        <div className="movie-list">
            {movies.map((movie, index) => (
                <div key={index} className="movie-card" onClick={() => onMovieClick(movie)}>
                    <img src={movie.poster} alt={movie.title} className="movie-poster" />
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                </div>
            ))}
        </div>
    )
}
export default MovieList