import React from "react";

const ArtistCardFlip = ({ name, image }) => {
  return (
    <div className="w-44 h-56 perspective">

      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">

        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden bg-zinc-900 rounded-xl p-4">

          <img
            src={image}
            alt={name}
            className="w-full h-32 object-cover rounded-lg"
          />

          <h3 className="text-white mt-3 font-semibold">{name}</h3>
          <p className="text-gray-400 text-sm">Artist</p>

        </div>

        {/* BACK */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-purple-600 rounded-xl flex flex-col items-center justify-center text-white">

          <h3 className="font-bold">{name}</h3>
          <p className="text-sm mt-2">Top Songs</p>

          <button className="mt-4 bg-white text-black px-4 py-2 rounded-full">
            ▶ Play
          </button>

        </div>

      </div>

    </div>
  )}

export default ArtistCardFlip;