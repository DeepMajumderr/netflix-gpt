const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-10 text-white bg-gradient-to-b from-black/60 to-transparent absolute w-full h-[100vh]">
      <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
        {title}
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-md">
        {overview}
      </p>
      <div className="flex gap-4">
        <button className="bg-white text-black text-lg font-semibold py-2 px-6 rounded-md hover:bg-gray-300 transition duration-200">
          ▶ Play
        </button>
        <button className="bg-gray-700 bg-opacity-70 text-white text-lg font-semibold py-2 px-6 rounded-md hover:bg-gray-600 transition duration-200">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
