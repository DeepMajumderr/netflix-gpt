import React from 'react';
import { useSelector } from 'react-redux';
import GptMovieList from './GptMovieList';

const Suggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;

  if (!movieNames || movieNames.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        No movie suggestions found.
      </div>
    );
  }

  return (
    // Removed bg-black from this div
    <div className="pb-10">
      <div className="mt-10 px-4 md:px-12">
        {/* Removed the h2 tag for "GPT Movie Recommendations" */}
        {/* <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white">
          GPT Movie Recommendations
        </h2> */}

        {movieNames.map((movieName, index) => (
          <GptMovieList
            key={movieName}
            title={movieName.trim()}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default Suggestions;