"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaArrowLeft,
  FaCog,
} from "react-icons/fa";
import { RiForward10Line, RiReplay10Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

const VideoPlayer = ({ videoUrl, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [closeButtonVisible, setCloseButtonVisible] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const mouseTimerRef = useRef(null);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const toggleMute = () => setIsMuted(!isMuted);
  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const handleSeekBackward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime - 10, "seconds");
  };

  const handleSeekForward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + 10, "seconds");
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration) => setDuration(duration);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      setControlsVisible(true);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      const hideCloseButton = setTimeout(() => {
        setCloseButtonVisible(false);
      }, 3000);
      return () => clearTimeout(hideCloseButton);
    } else {
      setCloseButtonVisible(true);
    }
  }, [isFullscreen]);

  const handleVideoReady = () => setIsLoading(false);
  const handleBuffer = () => setIsLoading(true);
  const handleBufferEnd = () => setIsLoading(false);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours > 0 ? `${hours}:` : "";
    const formattedMinutes = minutes > 0 ? `${minutes}:` : "00:";
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
  };

  const hideControlsAndCursor = () => {
    setControlsVisible(false);
    if (isFullscreen) {
      containerRef.current.style.cursor = "none";
    }
  };

  const showControlsAndCursor = () => {
    setControlsVisible(true);
    if (isFullscreen) {
      containerRef.current.style.cursor = "default";
    }

    if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    mouseTimerRef.current = setTimeout(hideControlsAndCursor, 3000);
  };

  useEffect(() => {
    if (isFullscreen) {
      containerRef.current.addEventListener("mousemove", showControlsAndCursor);
      mouseTimerRef.current = setTimeout(hideControlsAndCursor, 3000);

      return () => {
        containerRef.current.removeEventListener(
          "mousemove",
          showControlsAndCursor
        );
        if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
      };
    }
  }, [isFullscreen]);

  const handleKeyPress = (event) => {
    switch (event.key) {
      case " ":
        togglePlayPause();
        break;
      case "ArrowLeft":
        handleSeekBackward();
        break;
      case "ArrowRight":
        handleSeekForward();
        break;
      case "m":
        toggleMute();
        break;
      case "f":
        toggleFullscreen();
        break;
      case "Escape":
        if (isFullscreen) toggleFullscreen();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, currentTime, isFullscreen]);

  const handleVideoClick = () => togglePlayPause();
  const toggleSettings = () => setShowSettings(!showSettings);

  const changeQuality = (quality) => {
    setSelectedQuality(quality);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black flex justify-center items-center z-50"
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        onMouseMove={() => setControlsVisible(true)}
        ref={containerRef}
      >
        <motion.div
          className={`relative ${
            isFullscreen
              ? "w-full h-full"
              : "w-full max-w-5xl lg:max-w-4xl h-[80%]"
          } bg-black rounded-lg overflow-hidden`}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          onMouseMove={() => setControlsVisible(true)}
          ref={containerRef}
        >
          <div className="absolute hidden lg:block  top-16 right-12 ">
            <div className="flex items-center justify-center -space-x-2 opacity-60">
              <img src="/logo-rem.png" className="h-16 w-16" />
              <h4 className="font-bold font-roboto">OTTflix</h4>
            </div>
          </div>
          {closeButtonVisible && (
            <button
              onClick={onClose}
              className="absolute top-4 left-4  text-4xl text-[#ff0000] transition-duration duration-300 z-30"
            >
              <FaArrowLeft />
            </button>
          )}

          <div
            className="absolute w-full h-[77%] z-10 top-0 left-0"
            onClick={handleVideoClick}
          ></div>

          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <ClipLoader color="red" size={80} />
            </div>
          )}

          <ReactPlayer
            ref={playerRef}
            url={`${videoUrl}`}
            playing={isPlaying}
            controls={false}
            muted={isMuted}
            width="100%"
            height="100%"
            onProgress={handleProgress}
            onDuration={handleDuration}
            onReady={handleVideoReady}
            onBuffer={handleBuffer}
            onBufferEnd={handleBufferEnd}
            className="rounded-lg"
          />

          <div
            className={`absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 z-30 ${
              controlsVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full mb-2 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) =>
                  playerRef.current.seekTo((e.target.value / 100) * duration)
                }
                className="w-full h-1 cursor-pointer rounded-lg overflow-hidden appearance-none"
                style={{
                  background: `linear-gradient(to right, red ${progress}%, gray ${progress}%)`,
                }}
              />
              <span className="ml-2 text-white text-sm">
                {formatTime(duration - currentTime)}
              </span>
              <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background-color: white;
                  border: 2px solid white;
                  margin-top: -7px;
                }
                input[type="range"]::-moz-range-thumb {
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background-color: white;
                  border: 2px solid white;
                }
                input[type="range"]::-ms-thumb {
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background-color: white;
                  border: 2px solid white;
                }
              `}</style>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-white">
                <button
                  className="text-4xl hover:text-red-600 transition-duration duration-300"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  className="text-4xl hover:text-red-600 transition-duration duration-300"
                  onClick={handleSeekBackward}
                >
                  <RiReplay10Fill />
                </button>
                <button
                  className="text-4xl hover:text-red-600 transition-duration duration-300"
                  onClick={handleSeekForward}
                >
                  <RiForward10Line />
                </button>
                <button
                  className="text-4xl hover:text-red-600 transition-duration duration-300"
                  onClick={toggleMute}
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <button
                  className="text-4xl hover:text-red-600 transition-duration duration-300"
                  onClick={toggleSettings}
                >
                  <FaCog />
                </button>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-24 left-56 p-4 bg-black text-white rounded-lg shadow-lg"
                  >
                    <div>
                      <h3 className="text-sm">Quality</h3>
                      {["1080p", "720p", "480p", "360p"].map((quality) => (
                        <div
                          key={quality}
                          onClick={() => setSelectedQuality(quality)}
                          className="flex items-center space-x-2 mt-1"
                        >
                          <input
                            type="radio"
                            name="quality"
                            value={quality}
                            checked={selectedQuality === quality}
                            onChange={() => changeQuality(quality)}
                          />
                          <span className="cursor-pointer">{quality}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              <button
                onClick={toggleFullscreen}
                className="text-white text-4xl hover:text-red-600 transition-duration duration-300"
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoPlayer;
