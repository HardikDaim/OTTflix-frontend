"use client";
import React, { useState, useRef } from "react";
import MovieDetailsModal from "../modals/MovieDetailsModal";

const HindiMovies = ({ moviesData }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      if (direction === "left") {
        current.scrollLeft -= 1000;
      } else {
        current.scrollLeft += 1000;
      }
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      {moviesData && moviesData.length == 0 ? (
        <div className="hidden"></div>
      ) : (
        <div className="mt-8 px-2 select-none">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Trending Hindi Movies
          </h2>
          <div className="relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll("left")}
              className="absolute hidden md:block left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-black to-transparent h-full text-white p-1 shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 md:w-8 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {/* Right Scroll Button */}
            <button
              onClick={() => scroll("right")}
              className="absolute hidden md:block right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-l from-black to-transparent h-full text-white p-1 shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 md:w-8 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="mt-0 overflow-x-scroll scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 w-max">
                {moviesData && moviesData.length > 0 ? (
                  moviesData.map((movie) => (
                    <div
                      onClick={() => handleMovieClick(movie)}
                      key={movie.id}
                      className="w-[220px] h-[150px] bg-gray-800 flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={
                          movie.thumbnail || "https://via.placeholder.com/150"
                        }
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No Hindi movies available.</p>
                )}
              </div>
            </div>
          </div>
          {selectedMovie && (
            <MovieDetailsModal
              movie={selectedMovie}
              onClose={handleCloseModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default HindiMovies;
