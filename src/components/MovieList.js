import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-8">
      <h1 className="text-center text-lg md:text-2xl font-bold text-white mb-4">
        {title}
      </h1>
      <div className="flex overflow-x-auto no-scrollbar justify-center">
        <div className="flex gap-4 pl-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
