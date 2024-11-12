import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{movie.title}</h3>
          <p className="text-gray-600 mt-2">Rating: {movie.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
