import React from 'react'
import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo)

  useMovieTrailer(movieId)

  return (
    <div className="w-full h-full">
      {trailerVideo && (
        <iframe
          className="w-full h-full object-cover "
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
           allowFullScreen
        />
      )}

    </div>
  )
}

export default VideoBackground
