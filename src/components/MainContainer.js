// MainContainer.js
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
    // Adjusted padding-top to push content below the header
    // Header height is approx 56px on mobile, more on desktop
    <div className="relative w-full aspect-video md:h-screen overflow-hidden pt-[56px] md:pt-[96px] lg:pt-[112px]">
      {/*
        pt-[56px] for mobile (approx header height)
        md:pt-[96px] for medium screens
        lg:pt-[112px] for large screens
        These positive paddings ensure the content is below the header.
        'aspect-video' ensures a 16:9 aspect ratio.
        'md:h-screen' ensures it fills the screen height on larger devices.
      */}
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;