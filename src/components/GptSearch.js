import React from 'react';
import GptSearchBar from './GptSearchBar';
import Suggestions from './Suggestions';

const GptSearch = () => {
  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
          alt="bg"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center pt-36 px-4">
        <GptSearchBar />
        <Suggestions />
      </div>
    </div>
  );
};

export default GptSearch;
