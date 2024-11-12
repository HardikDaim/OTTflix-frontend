"use client";
import React, { useState, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import { FaVolumeUp, FaVolumeMute, FaInfoCircle, FaPlay } from "react-icons/fa";
import MovieDetailsModal from "../modals/MovieDetailsModal";
import VideoPlayer from "../modals/VideoPlayer"
// GraphQL query to get the featured video
const GET_FEATURED_VIDEO = gql`
  query GetFeaturedVideo {
    getFeaturedVideo {
      id
      title
      description
      trailerUrl
      genre
      thumbnail
      releaseDate
      director
      mainCast
      duration
      rating
    }
  }
`;

const GET_MOVIES = gql`
  query GetMovies {
    getMovies {
      id
      title
      description
      trailerUrl
      genre
      thumbnail
      releaseDate
      director
      mainCast
      duration
      rating
    }
  }
`;

const FeaturedSection = () => {
  const {
    loading: loadingFeatured,
    data: featuredData,
    error: featuredError,
  } = useQuery(GET_FEATURED_VIDEO);

  const {
    loading: loadingMovies,
    data: moviesData,
    error: movieError,
  } = useQuery(GET_MOVIES);

  const [isMuted, setIsMuted] = useState(true); // Mute state for the video
  const videoRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const handlePlayClick = () => {
    setIsMuted(true);
    setShowVideoPlayer(true); // Show the video player when Play is clicked
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false); // Hide the video player
  };
  // Show loading state for each query
  if (loadingFeatured || loadingMovies) return <div>Loading...</div>;

  // Show error messages for each query
  if (featuredError || movieError)
    return <div>Error: {featuredError?.message || movieError?.message}</div>;

  // Function to toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };
  
  const handleMovieClick = (movie) => {
    setIsMuted(true);
    setSelectedMovie(movie);
  };

  // Function to close the movie details modal
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="relative bg-cover bg-center h-[700px] overflow-hidden shadow-lg">
      {/* Display the video fetched from getFeaturedVideo */}
      {featuredData?.getFeaturedVideo && (
        <>
          {/* Thumbnail displayed until the video is loaded */}
          {!isVideoLoaded && (
            <img
              src={featuredData.getFeaturedVideo[0]?.thumbnail || "https://via.placeholder.com/150"}
              alt="Video Thumbnail"
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          )}

          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover absolute top-0 left-0"
            autoPlay
            loop
            muted={isMuted}
            controls={false}
            src={featuredData.getFeaturedVideo[0]?.trailerUrl}
            onLoadedData={handleVideoLoad} // Trigger when video is ready
          ></video>
        </>
      )}

      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Video Content */}
      <div className="absolute inset-0 flex flex-col justify-between pt-8 px-2 text-white">
        <div>
          <span className="text-green-400 font-bold text-sm mb-2 bg-black bg-opacity-50 p-2">
            New Arrivals
          </span>
          <h1 className="text-8xl font-bold font-roboto my-8">
            {featuredData?.getFeaturedVideo[0]?.title
              .split(" ")
              .map((word, index) => (
                <React.Fragment key={index}>
                  {word}
                  <br />
                </React.Fragment>
              )) || "Featured Title"}
          </h1>

          <p className="text-sm mt-2 font-poppins opacity-75">
            {" "}
            {featuredData?.getFeaturedVideo[0]?.genre || "New Episodes"}
          </p>
          <p className="text-sm mt-2 opacity-75 ">
            {featuredData?.getFeaturedVideo[0]?.description
              .split(" ")
              .map((word, index) => (
                <React.Fragment key={index}>
                  {word} {(index + 1) % 7 === 0 && <br />}{" "}
                  {/* Add a line break after every 15 words */}
                </React.Fragment>
              )) || "Description"}
          </p>
          <div className="my-8 space-x-8 flex items-center">
            {/* Play Button with Play Icon */}
            <button  onClick={handlePlayClick} className="bg-white text-2xl text-black py-2 px-6 font-semibold flex items-center space-x-2">
              <FaPlay className="text-xl" /> {/* Play icon */}
              <span>Play</span>
            </button>

            {/* Detail Button with Info Icon */}
            <button
              onClick={() =>
                handleMovieClick(featuredData?.getFeaturedVideo[0])
              }
              className="border text-2xl border-white py-2 px-6 text-white font-semibold flex items-center space-x-2"
            >
              <FaInfoCircle className="text-xl" /> {/* Info icon */}
              <span>Detail</span>
            </button>
          </div>
        </div>

        {/* Mute/Unmute Button */}
        <div className="absolute bottom-60 right-0 flex items-center space-x-4">
          <button
            onClick={toggleMute}
            className="bg-transparent border-2 border-white border-opacity-50 hover:bg-opacity-50 hover:bg-black text-white text-opacity-70 p-3 rounded-full"
          >
            {isMuted ? (
              <FaVolumeMute size={16} /> // Mute icon
            ) : (
              <FaVolumeUp size={16} /> // Unmute icon
            )}
          </button>
          <span className="text-white text-sm bg-black bg-opacity-40 border-l-2 border-white p-2 pr-8">
            {featuredData?.getFeaturedVideo[0].rating}
          </span>
        </div>

        {/* Movie Cards */}
        <div className="mt-0">
          <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
            {moviesData?.getMovies.map((movie) => (
              <div
                key={movie.id}
                className="w-[220px] h-[150px] bg-gray-800 flex-shrink-0 cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={movie.thumbnail || "https://via.placeholder.com/150"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
       {showVideoPlayer && (
        <VideoPlayer videoUrl={featuredData.getFeaturedVideo[0]?.trailerUrl} onClose={closeVideoPlayer} />
      )}
    </div>
  );
};

export default FeaturedSection;
