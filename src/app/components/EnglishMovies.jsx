"use client";
import React, { useState } from 'react';
import MovieDetailsModal from '../modals/MovieDetailsModal';

const EnglishMovies = ({ moviesData }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
      };

      const handleCloseModal = () => {
        setSelectedMovie(null);
      };

  return (
    <div className="mt-8 px-2">
    <h2 className="text-2xl font-semibold text-white mb-4">Amazing English Movies</h2>
    <div className="mt-0 overflow-x-scroll scrollbar-hide">
      <div className="flex space-x-4">
        {moviesData && moviesData.length > 0 ? (
          moviesData.map((movie) => (
            <div
              onClick={() => handleMovieClick(movie)}
              key={movie.id}
              className="w-[220px] h-[150px] bg-gray-800 flex-shrink-0 cursor-pointer"
            >
              <img
                src={movie.thumbnail || "https://via.placeholder.com/150"}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400">No English movies available.</p>
        )}
      </div>
    </div>
    {selectedMovie && (
      <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
    )}
  </div>
  
  );
};

export default EnglishMovies;
