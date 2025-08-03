import React from 'react';

const IMG_CDN = "https://image.tmdb.org/t/p/w500";

const GptMovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
        {title}
      </h2>

      {/* Changed from flex with overflow-x-auto to a responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) =>
          movie?.poster_path ? (
            <div
              key={movie.id}
              className="w-full aspect-[2/3] flex items-center justify-center bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                className="w-full h-full object-contain"
                src={IMG_CDN + movie.poster_path}
                alt={movie.title || "Movie poster"}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default GptMovieList;