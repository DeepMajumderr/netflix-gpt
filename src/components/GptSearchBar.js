import React from 'react';
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {

  const language = useSelector(store => store.config.lang)


  const toShow = lang[language]



  return (
    <div className="flex justify-center w-full px-4">
      <form className="w-full max-w-2xl flex items-center bg-white rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
          className="flex-grow px-5 py-3 text-black text-sm md:text-base placeholder-gray-500 outline-none"
          placeholder={toShow.gptSearchPlaceholder}
        />
        <button
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

