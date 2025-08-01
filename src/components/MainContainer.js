import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-screen overflow-hidden pb-2 sm:pb-2 md:pb-2 lg:pb-2">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;