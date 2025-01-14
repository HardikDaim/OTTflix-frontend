"use client";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FiSearch } from "react-icons/fi";
import "react-loading-skeleton/dist/skeleton.css";
import MovieDetailsModal from "../modals/MovieDetailsModal";
import { IoCloseOutline } from "react-icons/io5";
import MobileNavigation from "../components/MobileNavigation";

const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      title
      description
      genres
      trailerUrl
      thumbnail
      country
      language
      awards
      productionCompanies
      tags
      dateAdded
      featured
      continueWatching
      releaseDate
      director
      mainCast
      duration
      rating
    }
  }
`;

const RECOMMENDED_MOVIES = gql`
  query GetRecommendedMovies {
    recommendedMovies {
      id
      title
      description
      synopsis
      genres
      trailerUrl
      thumbnail
      country
      language
      awards
      productionCompanies
      tags
      dateAdded
      featured
      continueWatching
      releaseDate
      director
      mainCast
      duration
      rating
    }
  }
`;

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
  } = useQuery(SEARCH_MOVIES, {
    variables: { query: searchQuery },
    skip: !searchQuery,
  });

  const {
    loading: recommendLoading,
    error: recommendError,
    data: recommendData,
  } = useQuery(RECOMMENDED_MOVIES, {
    skip: searchQuery.trim() !== "",
  });

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Fetch results based on the query
    }
  };

  return (
    <>
      <SkeletonTheme baseColor="#2d2d2d" highlightColor="#3c3c3c">
        <div className="min-h-screen bg-black text-white select-none">
          <Sidebar />
          <MobileNavigation />
          <div className="flex-1 mx-4 lg:ml-24 lg:mr-12">
            
                {recommendLoading ? (
                  <div className="flex items-center py-8">
                    <span className="w-full rounded-lg">
                      <Skeleton height={55} className="w-full rounded-lg mb-4" />
                    </span>{" "}
                  </div>
                ) : (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center py-8 relative"
                  >
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-90">
                      <FiSearch size={20} />
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for movies..."
                      className="pl-12 bg-gray-700 opacity-70 w-full text-white p-4 rounded-lg focus:outline-none"
                    />
                    {searchQuery.trim().length > 0 && (
                      <span
                        onClick={() => setSearchQuery("")}
                        className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-white opacity-90"
                      >
                        <IoCloseOutline size={20} />
                      </span>
                    )}
                  </form>
                )}
            

            {searchLoading ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[...Array(15)].map((_, index) => (
                    <div key={index}>
                      <Skeleton className="w-full h-24 xl:h-36 object-cover mb-2rounded-lg" />
                    </div>
                  ))}
                </div>
              </>
            ) : searchError ? (
              <p className="text-center text-red-500">
                Error: {searchError.message}
              </p>
            ) : searchData?.searchMovies.length === 0 && searchQuery ? (
              <p className="text-center text-gray-500">
                No movies found for "{searchQuery}". Please try a different
                search.
              </p>
            ) : null}

            <div className="mb-8">
              {!searchQuery && (
                <>
                  {recommendLoading ? (
                    <>
                      <Skeleton height={30} className="rounded-lg mb-4" />
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(15)].map((_, index) => (
                          <div key={index}>
                            <Skeleton className="w-full h-24 xl:h-36 object-cover mb-2 rounded-lg" />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : recommendError ? (
                    <p className="text-red-500">
                      Error fetching recommendations: {recommendError.message}
                    </p>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">
                        Recommended Movies
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {recommendData?.recommendedMovies.map((movie) => (
                          <div
                            onClick={() => handleMovieClick(movie)}
                            key={movie.id}
                            className="cursor-pointer shadow-md text-center"
                          >
                            <img
                              src={movie.thumbnail}
                              alt={movie.title}
                              className="w-full h-24 xl:h-36 object-cover mb-2"
                            />
                            <p className="text-white text-xs">
                              {movie.title.length > 17
                                ? `${movie.title.substring(0, 17)}...`
                                : movie.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchData?.searchMovies.map((movie) => (
                <div
                  onClick={() => handleMovieClick(movie)}
                  key={movie.id}
                  className="cursor-pointer shadow-md text-center"
                >
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full h-24 xl:h-36 object-cover mb-2"
                  />
                  <h3 className="text-md font-bold mb-2">
                    {movie.title.length > 17
                      ? `${movie.title.substring(0, 17)}...`
                      : movie.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-2">
                    Genres: {movie.genres.join(", ")}
                  </p>
                  <p className="text-gray-400 text-xs mb-2">
                    Director: {movie.director}
                  </p>
                  <p className="text-gray-400 text-xs mb-2">
                    Main Cast: {movie.mainCast.join(", ")}
                  </p>
                  <p className="text-gray-400 text-xs mb-2">
                    Duration: {movie.duration} minutes
                  </p>
                  <p className="text-gray-400 text-xs mb-2">
                    Rating: {movie.rating}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Release Date: {movie.releaseDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {selectedMovie && (
            <MovieDetailsModal
              movie={selectedMovie}
              onClose={handleCloseModal}
            />
          )}
        </div>
        <Footer />
      </SkeletonTheme>
    </>
  );
};

export default SearchPage;
