// import React, { useRef, useState } from "react";

// const ArtistCardPreview = ({ name, image, songs }) => {

//   const audioRef = useRef(null);

//   const [volume, setVolume] = useState(0.5);
//   const [isMuted, setIsMuted] = useState(false);

//   const playPreview = () => {

//     if (!songs || songs.length === 0) return;

//     const randomSong = songs[Math.floor(Math.random() * songs.length)];

//     audioRef.current.src = randomSong;

//     audioRef.current.volume = volume;

//     audioRef.current.play();

//     // stop after 5 seconds
//     setTimeout(() => {
//       audioRef.current.pause();
//     }, 5000);

//   };

//   const stopPreview = () => {
//     audioRef.current.pause();
//   };

//   const toggleMute = (e) => {

//     e.stopPropagation();

//     if (isMuted) {
//       audioRef.current.volume = volume;
//     } else {
//       audioRef.current.volume = 0;
//     }

//     setIsMuted(!isMuted);
//   };

//   const changeVolume = (e) => {

//     const newVolume = e.target.value;

//     setVolume(newVolume);

//     audioRef.current.volume = newVolume;

//   };

//   return (

//     <div
//       onMouseEnter={playPreview}
//       onMouseLeave={stopPreview}
//       className="bg-zinc-900 p-4 rounded-xl w-44 cursor-pointer group relative hover:bg-zinc-800 transition"
//     >

//       <img
//         src={image}
//         alt={name}
//         className="w-full h-32 object-cover rounded-lg"
//       />

//       <h3 className="text-white mt-3 font-semibold">{name}</h3>

//       <p className="text-gray-400 text-sm">Artist</p>

//       {/* SOUND CONTROL */}

//       <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

//         <button
//           onClick={toggleMute}
//           className="bg-black/70 p-1 rounded"
//         >
//           {isMuted ? "🔇" : "🔊"}
//         </button>

//         <input
//           type="range"
//           min="0"
//           max="1"
//           step="0.01"
//           value={isMuted ? 0 : volume}
//           onChange={changeVolume}
//           className="w-16"
//         />

//       </div>

//       <audio ref={audioRef}></audio>

//     </div>

//   );
// };

// export default ArtistCardPreview;


// import React, { useRef, useState } from "react";

// const ArtistCardPreview = ({ name, image, songs }) => {

//   const audioRef = useRef(null);

//   const [isMuted, setIsMuted] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const playPreview = () => {

//     if (!songs || songs.length === 0) return;

//     const randomSong =
//       songs[Math.floor(Math.random() * songs.length)];

//     audioRef.current.src = randomSong;

//     audioRef.current.muted = isMuted;

//     audioRef.current.play();

//     setIsPlaying(true);

//     // stop after 6 seconds
//     setTimeout(() => {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }, 6000);
//   };

//   const stopPreview = () => {
//     audioRef.current.pause();
//     setIsPlaying(false);
//   };

//   const toggleMute = (e) => {

//     e.stopPropagation();

//     audioRef.current.muted = !isMuted;

//     setIsMuted(!isMuted);
//   };

//   return (

//     <div
//       onMouseEnter={playPreview}
//       onMouseLeave={stopPreview}
//       className="bg-zinc-900 p-4 rounded-xl w-44 cursor-pointer group relative hover:bg-zinc-800 transition"
//     >

//       <img
//         src={image}
//         alt={name}
//         className="w-full h-32 object-cover rounded-lg"
//       />

//       <h3 className="text-white mt-3 font-semibold">{name}</h3>
//       <p className="text-gray-400 text-sm">Artist</p>

//       {/* AUDIO CONTROLS */}

//       <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

//         {/* MUTE BUTTON */}

//         <button
//           onClick={toggleMute}
//           className="bg-black/70 p-2 rounded-full text-white"
//         >
//           {isMuted ? "🔇" : "🔊"}
//         </button>

//         {/* PLAYING INDICATOR */}

//         {isPlaying && (
//           <div className="flex gap-1 items-end h-4">

//             <span className="w-1 bg-green-400 animate-pulse h-2"></span>
//             <span className="w-1 bg-green-400 animate-pulse h-4"></span>
//             <span className="w-1 bg-green-400 animate-pulse h-3"></span>

//           </div>
//         )}

//       </div>

//       <audio ref={audioRef}></audio>

//     </div>
//   );
// };

// export default ArtistCardPreview;

import React, { useRef, useState } from "react";

const ArtistCardPreview = ({ name, image }) => {

  const audioRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPreview = async () => {

    try {

      const res = await fetch(
        `https://api.deezer.com/search?q=${name}`
      );

      const data = await res.json();

      const songs = data.data;

      if (!songs || songs.length === 0) return;

      const randomSong =
        songs[Math.floor(Math.random() * songs.length)];

      const preview = randomSong.preview;

      audioRef.current.src = preview;
      audioRef.current.muted = isMuted;

      await audioRef.current.play();

      setIsPlaying(true);

      setTimeout(() => {
        audioRef.current.pause();
        setIsPlaying(false);
      }, 5000);

    } catch (err) {
      console.log(err);
    }

  };

  const stopPreview = () => {

    audioRef.current.pause();

    setIsPlaying(false);

  };

  const toggleMute = (e) => {

    e.stopPropagation();

    audioRef.current.muted = !isMuted;

    setIsMuted(!isMuted);

  };

  return (

    <div
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      className="bg-zinc-900 p-4 rounded-xl w-44 hover:bg-zinc-800 transition cursor-pointer group relative"
    >

      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded-lg"
      />

      <h3 className="text-white mt-3 font-semibold">{name}</h3>

      <p className="text-gray-400 text-sm">Artist</p>

      {/* AUDIO CONTROLS */}

      <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

        <button
          onClick={toggleMute}
          className="bg-black/70 p-2 rounded-full text-white"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {isPlaying && (
          <div className="flex gap-1 items-end h-4">

            <span className="w-1 bg-green-400 animate-pulse h-2"></span>
            <span className="w-1 bg-green-400 animate-pulse h-4"></span>
            <span className="w-1 bg-green-400 animate-pulse h-3"></span>

          </div>
        )}

      </div>

      <audio ref={audioRef}></audio>

    </div>
  );
};

export default ArtistCardPreview;