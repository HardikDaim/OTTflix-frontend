"use client";
import React, { useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute, FaInfoCircle, FaPlay } from "react-icons/fa";
import MovieDetailsModal from "../modals/MovieDetailsModal";
import VideoPlayer from "../modals/VideoPlayer";
import Skeleton from "react-loading-skeleton";

const FeaturedSection = ({ featuredData, moviesData }) => {
  const [isMuted, setIsMuted] = useState(true); // Mute state for the video
  const videoRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
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

  const handlePlayClick = () => {
    setIsMuted(true);
    setShowVideoPlayer(true); // Show the video player when Play is clicked
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false); // Hide the video player
  };

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
    <div className="relative select-none bg-cover bg-center h-[500px] lg:h-[700px] overflow-hidden shadow-lg">
      {/* Display the video fetched from getFeaturedVideo */}
      {featuredData?.getFeaturedVideo && (
        <>
          {/* Thumbnail displayed until the video is loaded */}
          {!isVideoLoaded && (
            <img
              src={
                featuredData.getFeaturedVideo[0]?.thumbnail ||
                "https://via.placeholder.com/150"
              }
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
          <span className="text-green-400 font-bold text-xs lg:text-sm mb-2 bg-black bg-opacity-50 p-2">
            New Arrivals
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-8xl font-bold font-roboto my-8">
            {featuredData?.getFeaturedVideo[0]?.title
              .split(" ")
              .map((word, index) => (
                <React.Fragment key={index}>
                  {word}
                  <br />
                </React.Fragment>
              ))}
          </h1>

          <div className="text-xs lg:text-sm mt-2 font-poppins opacity-75">
            {" "}
            <ul className="flex space-x-6">
              {featuredData?.getFeaturedVideo[0]?.genres?.map(
                (genre, index) => (
                  <li key={index} className="list-disc">
                    {genre}
                  </li>
                )
              )}
            </ul>
          </div>
          <p className="text-xs lg:text-sm mt-2 opacity-75 ">
            {featuredData?.getFeaturedVideo[0]?.description
              .split(" ")
              .map((word, index) => (
                <React.Fragment key={index}>
                  {word} {(index + 1) % 7 === 0 && <br />}{" "}
                  {/* Add a line break after every 7 words */}
                </React.Fragment>
              ))}
          </p>
          <div className="my-8 space-x-8 flex items-center">
            {/* Play Button with Play Icon */}
            <button
              onClick={handlePlayClick}
              className="bg-white text-md lg:text-2xl text-black py-2 px-6 font-semibold flex items-center space-x-2"
            >
              <FaPlay /> {/* Play icon */}
              <span>Play</span>
            </button>

            {/* Detail Button with Info Icon */}
            <button
              onClick={() =>
                handleMovieClick(featuredData?.getFeaturedVideo[0])
              }
              className="border text-md lg:text-2xl border-white py-2 px-6 text-white font-semibold flex items-center space-x-2"
            >
              <FaInfoCircle /> {/* Info icon */}
              <span>Detail</span>
            </button>
          </div>
        </div>

        {/* Mute/Unmute Button */}
        <div className="absolute bottom-[10.5rem] md:bottom-40 lg:bottom-60 right-0 flex items-center space-x-4">
          <button
            onClick={toggleMute}
            className="bg-transparent border-2 border-white border-opacity-50 hover:bg-opacity-50 hover:bg-black text-white text-opacity-70 p-3 mr-4 md:mr-0 rounded-full"
          >
            {isMuted ? (
              <FaVolumeMute size={16} /> // Mute icon
            ) : (
              <FaVolumeUp size={16} /> // Unmute icon
            )}
          </button>
          <span className="hidden md:flex text-white text-xs lg:text-sm bg-black bg-opacity-40 border-l-2 border-white p-2 pr-8">
            {featuredData?.getFeaturedVideo[0].rating}
          </span>
        </div>
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

          {/* Movie Cards */}
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
          >
            {moviesData?.getMovies.map((movie) => (
              <div
                key={movie.id}
                className="w-[220px] h-[150px] bg-gray-800 flex-shrink-0 cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg"
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
        <VideoPlayer
          videoUrl={featuredData.getFeaturedVideo[0]?.trailerUrl}
          onClose={closeVideoPlayer}
        />
      )}
    </div>
  );
};

export default FeaturedSection;
