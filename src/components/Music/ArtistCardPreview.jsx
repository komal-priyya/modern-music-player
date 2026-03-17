import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArtistCardPreview = ({ artist }) => {

  const navigate = useNavigate();
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const playSong = () => {

    if (!artist.songs.length) return;

    const randomSong =
      artist.songs[Math.floor(Math.random() * artist.songs.length)];

    audioRef.current.src = randomSong;
    audioRef.current.muted = muted;

    audioRef.current.play().catch(() => {});

    timerRef.current = setTimeout(() => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }, 6000);

  };

  const stopSong = () => {

    clearTimeout(timerRef.current);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

  };

  const toggleMute = (e) => {

    e.stopPropagation();

    const newMuted = !muted;
    setMuted(newMuted);

    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }

  };

  return (

    <div
      onClick={() => navigate(`/artist/${artist.name}`)}
      onMouseEnter={playSong}
      onMouseLeave={stopSong}
      className="
      relative
      w-full
      max-w-[200px]
      mx-auto
      rounded-2xl
      p-4
      bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400
      shadow-md hover:shadow-xl
      hover:scale-105
      transition duration-300
      cursor-pointer
      text-white
      "
    >

      <div className="flex justify-center">

        <img
          src={artist.image}
          alt={artist.name}
          className="
          w-24 h-24
          sm:w-28 sm:h-28
          md:w-32 md:h-32
          rounded-full
          object-cover
          border-4 border-white
          shadow-lg
          "
        />

      </div>

      <h3 className="text-center mt-4 font-semibold text-lg">
        {artist.name}
      </h3>

      <button
        onClick={toggleMute}
        className="
        absolute top-3 right-3
        bg-black/40 backdrop-blur
        rounded-full w-8 h-8
        flex items-center justify-center
        "
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <audio ref={audioRef}></audio>

    </div>

  );

};

export default ArtistCardPreview;