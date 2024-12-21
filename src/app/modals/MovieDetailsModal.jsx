"use client";
import React, { useState } from "react";
import { FaTimes, FaVolumeUp, FaVolumeMute, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import VideoPlayer from "./VideoPlayer.jsx";

const MovieDetailsModal = ({ movie, onClose }) => {
  const [isMuted, setIsMuted] = useState(true); // State to manage video mute/unmute
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  
  if (!movie) return null; // If no movie is passed, return nothing
  const handlePlayClick = () => {
    setIsMuted(true);
    setShowVideoPlayer(true); // Show the video player when Play is clicked
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false); // Hide the video player
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true); // Set to true once the video is loaded
  };
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Framer Motion variants for professional animation
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: -100, // Slide from above
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275], // Ease for a bouncy effect
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 100, // Slide out to bottom
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-10"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-black border-2 border-gray-500 rounded-lg w-[95%] md:w-[70%] lg:w-[50%] overflow-y-auto max-h-[80vh] mb-16 lg:mb-0 md:max-h-[90vh] shadow-lg text-xs"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Movie Video */}
        <div className="mb-6 relative">
          {!isVideoLoaded && (
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full h-[250px] md:h-[400px] object-cover absolute top-0 left-0"
            />
          )}

          {/* Video element */}
          <video
            src={movie.trailerUrl}
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-[250px] md:h-[400px] object-cover"
            onLoadedData={handleVideoLoad} // Triggered when video is ready to play
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black p-2 rounded-full bg-opacity-50 hover:bg-opacity-80 text-white hover:text-red-500 transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>

          <button
            onClick={handlePlayClick}
            className="absolute bottom-4 left-4 md:left-8 bg-white text-sm md:text-2xl text-black py-2 px-6 font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors"
          >
            <FaPlay className="text-xl" />
            <span>Play</span>
          </button>

          {/* Speaker Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition-colors"
          >
            {isMuted ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
          </button>
        </div>

        <div className="m-4 md:m-8 opacity-75">
          <div className="flex justify-between items-center border-b-2 border-gray-700 pb-4 mb-4">
            <h2 className="text-lg md:text-3xl font-bold text-white">
              {movie.title}
            </h2>
          </div>

          {/* Main Cast */}
          {movie.mainCast && movie.mainCast.length > 0 && (
              <div className="mb-4">
                <strong className="font-semibold text-md md:text-lg">
                  Main Cast:
                </strong>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  {movie.mainCast.map((castMember, index) => (
                    <li key={index} className="text-sm md:text-base">
                      {castMember}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Movie Description */}
          <div className="mt-4 text-white">
            <h3 className="text-md md:text-xl font-semibold mb-2">
              Description:
            </h3>
            <p className="text-xs md:text-lg">{movie.description}</p>
          </div>

          {/* Movie Synopsis */}
          <div className="mt-4 text-white">
            <h3 className="text-md md:text-xl font-semibold mb-2">Synopsis:</h3>
            <p className="text-xs md:text-lg">{movie.synopsis}</p>
          </div>

          {/* Movie Details */}
          <div className="mt-6 text-white text-xs md:text-lg">
            {/* Genres */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Genres:
              </strong>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {movie.genres?.map((genre, index) => (
                  <li key={index} className="text-sm md:text-base">
                    {genre}
                  </li>
                ))}
              </ul>
            </div>

            {/* Release Date */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Release Date:
              </strong>{" "}
              {movie.releaseDate || "N/A"}
            </div>

            {/* Movie Language */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Movie Language:
              </strong>{" "}
              {movie.language || "N/A"}
            </div>

            {/* Movie Country */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Movie Country:
              </strong>{" "}
              {movie.country || "N/A"}
            </div>

            {/* Awards */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Awards:
              </strong>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {movie.awards?.map((award, index) => (
                  <li key={index} className="text-sm md:text-base">
                    {award}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Tags:
              </strong>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {movie.tags?.map((tag, index) => (
                  <li key={index} className="text-sm md:text-base">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Production Companies */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Production Companies:
              </strong>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {movie.productionCompanies?.map((productionCompany, index) => (
                  <li key={index} className="text-sm md:text-base">
                    {productionCompany}
                  </li>
                ))}
              </ul>
            </div>

            {/* Director */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Director:
              </strong>{" "}
              {movie.director || "N/A"}
            </div>

            

            {/* Rating */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Rating:
              </strong>{" "}
              {movie.rating ? `${movie.rating}` : "N/A"}
            </div>

            {/* Duration */}
            <div className="mb-4">
              <strong className="font-semibold text-md md:text-lg">
                Duration:
              </strong>{" "}
              {movie.duration ? `${movie.duration} minutes` : "N/A"}
            </div>
          </div>
        </div>
      </motion.div>
      {showVideoPlayer && (
        <VideoPlayer videoUrl={movie.trailerUrl} onClose={closeVideoPlayer} />
      )}
    </div>
  );
};

export default MovieDetailsModal;
