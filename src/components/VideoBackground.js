// VideoBackground.js
import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);

  useMovieTrailer(movieId); // Custom hook to fetch the trailer

  if (!trailerVideo) return null; // Render nothing if trailerVideo is not available

  return (
    <div className="w-screen"> {/* Use w-screen to ensure it spans full width */}
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen

      ></iframe>
    </div>
  );
};

export default VideoBackground;