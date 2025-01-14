"use client"
import React from 'react';

const ContinueWatching = () => {
  return (
    <div className="mt-8 px-2">
      <h2 className="text-lg md:text-2xl font-semibold text-white mb-4">Continue Watching</h2>
        <div className="mt-0">
          <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
         
              <div
                // key={movie.id}
                className="w-[170px] h-[95px] md:w-[220px] md:h-[130px] bg-gray-800 flex-shrink-0 cursor-pointer"
                // onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={ "https://via.placeholder.com/150"}
             
                  className="w-full h-full object-cover"
                />
              </div>
           
          </div>
        </div>
      </div>

  );
};

export default ContinueWatching;
