"use client";
import React, { useState } from "react";
import { FaTimes, FaVolumeUp, FaVolumeMute, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import VideoPlayer from "./VideoPlayer.jsx";

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null; // If no movie is passed, return nothing

  const [isMuted, setIsMuted] = useState(true); // State to manage video mute/unmute
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

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
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-10"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-black border-2 border-gray-500 rounded-lg w-[80%] max-w-5xl overflow-y-auto max-h-[95vh] shadow-lg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Movie Video */}
        <div className="mb-6 relative">
          {!isVideoLoaded && (
            <img
              src={movie.thumbnail || "https://via.placeholder.com/400"}
              alt={movie.title}
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          )}

          {/* Video element */}
          <video
            src={movie.trailerUrl}
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-[400px] object-cover"
            onLoadedData={handleVideoLoad} // Triggered when video is ready to play
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black p-2 rounded-full bg-opacity-50 hover:bg-opacity-80 text-white hover:text-red-500 transition-colors"
          >
            <FaTimes />
          </button>

          <button
            onClick={handlePlayClick}
            className="absolute bottom-4 left-8 bg-white text-2xl text-black py-2 px-6 font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors"
          >
            <FaPlay className="text-xl" />
            <span>Play</span>
          </button>

          {/* Speaker Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition-colors"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>

        <div className="m-8 opacity-75">
          <div className="flex justify-between items-center border-b-2 border-gray-700 pb-4 mb-4">
            <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
          </div>

          {/* Movie Description */}
          <div className="mt-4 text-white">
            <h3 className="text-xl font-semibold mb-2">Description:</h3>
            <p className="text-lg">{movie.description}</p>
          </div>

          {/* Movie Details */}
          <div className="mt-6 text-white">
            <div className="mb-2">
              <strong className="font-semibold">Genre:</strong> {movie.genre}
            </div>
            <div className="mb-2">
              <strong className="font-semibold">Release Date:</strong>{" "}
              {movie.releaseDate || "N/A"}
            </div>
            <div className="mb-2">
              <strong className="font-semibold">Director:</strong>{" "}
              {movie.director || "N/A"}
            </div>

            {/* Main Cast - Display as bulleted points */}
            {movie.mainCast && movie.mainCast.length > 0 && (
              <div className="mb-2">
                <strong className="font-semibold">Main Cast:</strong>
                <ul className="list-disc pl-5 mt-2">
                  {movie.mainCast.map((castMember, index) => (
                    <li key={index} className="text-lg">
                      {castMember}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-2">
              <strong className="font-semibold">Duration:</strong>{" "}
              {movie.duration ? `${movie.duration} minutes` : "N/A"}
            </div>
          </div>

          {/* Watch Now Button */}
          <div className="mt-6 flex items-center justify-center">
            <a
              href={movie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white py-3 px-8 rounded-full text-lg hover:bg-indigo-700 transition-colors"
            >
              Watch Now
            </a>
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
