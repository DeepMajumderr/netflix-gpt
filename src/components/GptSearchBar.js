import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import model from '../utils/openai'; // Correct Gemini import
import { API_OPTIONS } from '../utils/constants';
import { addGptMoviesResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch()
  const searchText = useRef(null);
  const language = useSelector((store) => store.config.lang);
  const toShow = lang[language];

  //movie search in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
    const json = await data.json()
    return json.results
  }


  const handleGptSearchClick = async () => {
    const userInput = searchText.current.value;
    if (!userInput) return;

    const gptQuery = `
      You are a movie recommendation system for a movie app.
      Based on the user's input: "${userInput}", recommend exactly 5 top-rated movies.
      Reply with only the movie names, comma-separated, with no extra text.
      If the input is not about movies or entertainment, respond exactly with:
      "Query not relevant — this app only recommends movies."
    `;

    try {
      // Gemini requires an array of prompts
      const result = await model.generateContent([gptQuery]);
      const response = await result.response;
      const geminiMovies = await response.text().split(",");

      // for each movie search the TMDB API

      const promiseArray = geminiMovies.map(movie => searchMovieTMDB(movie))

      const tmdbResults = await Promise.all(promiseArray)

      console.log(tmdbResults) 

      dispatch(addGptMoviesResult({movieNames: geminiMovies, movieResults: tmdbResults}))

    } catch (error) {
      console.error("Gemini API Error:", error);
    }
  };

  return (
    <div className="flex justify-center w-full px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-2xl flex items-center bg-white rounded-full shadow-lg overflow-hidden"
      >
        <input
          ref={searchText}
          type="text"
          className="flex-grow px-5 py-3 text-black text-sm md:text-base placeholder-gray-500 outline-none"
          placeholder={toShow.gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 transition duration-200"
        >
          {toShow.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
