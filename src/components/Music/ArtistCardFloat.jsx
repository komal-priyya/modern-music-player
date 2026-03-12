import React from "react";

const ArtistCardFloat = ({ name, image }) => {
  return (

    <div className="bg-zinc-900 p-4 rounded-xl w-44 cursor-pointer group transition hover:bg-zinc-800 relative">

      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded-lg"
      />

      <h3 className="text-white mt-3 font-semibold">{name}</h3>
      <p className="text-gray-400 text-sm">Artist</p>

      {/* Floating Play Button */}

      <button
        className="
        absolute bottom-10 right-5
        bg-blue-500
        w-10 h-10
        rounded-full
        flex items-center justify-center
        text-black
        opacity-0
        translate-y-4
        group-hover:opacity-100
        group-hover:translate-y-0
        transition duration-300
        "
      >
        ▶
      </button>

    </div>

  );
};

export default ArtistCardFloat;