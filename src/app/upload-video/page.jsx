"use client";
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import apiBaseUrl from "../api/api.js";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [awards, setAwards] = useState("");
  const [productionCompanies, setProductionCompanies] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [mainCast, setMainCast] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!title) formErrors.title = "Title is required.";
    if (!description) formErrors.description = "Description is required.";
    if (!genre) formErrors.genre = "Genre is required.";
    if (!file) formErrors.file = "Please select a video file.";
    if (!thumbnail) formErrors.thumbnail = "Please select a thumbnail image.";
    if (!releaseDate) formErrors.releaseDate = "Release date is required.";
    if (!director) formErrors.director = "Director is required.";
    if (!mainCast) formErrors.mainCast = "Main cast is required.";
    if (!duration) formErrors.duration = "Duration is required.";
    if (!rating) formErrors.rating = "Rating is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fix the errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("synopsis", synopsis);
    formData.append("genres", genre);
    formData.append("country", country);
    formData.append("language", language);
    formData.append("awards", awards);
    formData.append("productionCompanies", productionCompanies);
    formData.append("tags", tags);
    formData.append("featured", featured);
    formData.append("releaseDate", releaseDate);
    formData.append("director", director);
    formData.append("mainCast", mainCast);
    formData.append("duration", duration);
    formData.append("rating", rating);

    try {
      setLoading(true);
      setProgress(0);
      const response = await axios.post(
        `${apiBaseUrl}/api/videos/upload-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      setMessage(response.data.message);
      setErrors({});

      if (response.status === 200) {
        setFile(null);
        setThumbnail(null);
        setTitle("");
        setDescription("");
        setSynopsis("");
        setGenre("");
        setCountry("");
        setLanguage("");
        setAwards("");
        setProductionCompanies("");
        setTags("");
        setFeatured(false);
        setReleaseDate("");
        setDirector("");
        setMainCast("");
        setDuration("");
        setRating("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error uploading video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Upload Your Video</h2>
            <p className="mt-1 text-gray-400">
              Share your content with the world
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter video title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  placeholder="Enter video description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Synopsis (Detailed Description)
                </label>
                <textarea
                  placeholder="Synopsis"
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.synopsis && (
                  <p className="text-red-500 text-sm">{errors.synopsis}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Genres (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Enter video genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.genre && (
                  <p className="text-red-500 text-sm">{errors.genre}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Country where Movie belongs to
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Language (Comma Separated)
                </label>
                <input
                  placeholder="Language (comma separated)"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.language && (
                  <p className="text-red-500 text-sm">{errors.language}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Awards (Comma Separated)
                </label>
                <input
                  placeholder="Awards (comma separated)"
                  value={awards}
                  onChange={(e) => setAwards(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.awards && (
                  <p className="text-red-500 text-sm">{errors.awards}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                Production Companies (comma separated)
                </label>
                <input
                 placeholder="Production Companies (comma separated)"
                 value={productionCompanies}
                 onChange={(e) => setProductionCompanies(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.productionCompanies && (
                  <p className="text-red-500 text-sm">{errors.productionCompanies}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                Tags  (comma separated)
                </label>
                <input
                 placeholder="Tags (comma separated)"
                 value={tags}
                 onChange={(e) => setTags(e.target.value)}   
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.Tags && (
                  <p className="text-red-500 text-sm">{errors.Tags}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Featured
                </label>
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={() => setFeatured(!featured)}
                    className="w-5 h-5"
                  />
                  <div className="ml-2 text-gray-300">
                    Tick to set your Movie to the Featured Section
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 ">
                  Release Date
                </label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className="w-full px-3 py-2 border placeholder-gray-100 border-gray-700 bg-gray-800 text-gray-100 rounded-md"
                />
                {errors.releaseDate && (
                  <p className="text-red-500 text-sm">{errors.releaseDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Director
                </label>
                <input
                  type="text"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
                />
                {errors.director && (
                  <p className="text-red-500 text-sm">{errors.director}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Main Cast (comma separated)
                </label>
                <input
                  type="text"
                  value={mainCast}
                  onChange={(e) => setMainCast(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
                />
                {errors.mainCast && (
                  <p className="text-red-500 text-sm">{errors.mainCast}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Duration (in minutes)
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm">{errors.duration}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Rating
                </label>
                <input
                  type="text"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">{errors.rating}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Select Trailer Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-400"
                />
                {errors.file && (
                  <p className="text-red-500 text-sm">{errors.file}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Select Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="block w-full text-sm text-gray-400"
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm">{errors.thumbnail}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 text-white rounded-md ${
                  loading
                    ? "bg-indigo-400 hover:bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Uploading..." : "Upload Video"}
              </button>

              {message && (
                <p className="text-center text-sm mt-2 text-green-400">
                  {message}
                </p>
              )}
            </div>
          </form>
        </div>
      </main>
      {/* Overlay for the progress bar */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-center p-4 bg-black rounded-lg">
            <ClipLoader color="#ff0000" loading={loading} size={50} />
            <div className="mt-4">
              <progress
                value={progress}
                max="100"
                className="w-64 h-2 progress-bar"
              >
                {" "}
              </progress>
              <p className="text-white mt-2">{progress}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
