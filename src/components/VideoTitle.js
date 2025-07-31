import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute z-10 top-0 left-0 w-full h-full pt-[15%] px-12 text-white bg-gradient-to-r from-black">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
      <p className="text-lg md:text-xl w-full md:w-1/2 mb-8">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-white text-black text-lg font-semibold py-2 px-6 rounded-md hover:bg-opacity-80 transition">
          ▶ Play
        </button>
        <button className="bg-gray-600 bg-opacity-70 text-white text-lg font-semibold py-2 px-6 rounded-md hover:bg-opacity-50 transition">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;