import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArtistPage = () => {

  const { name } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {

    const fetchSongs = async () => {

      const res = await fetch(
        `https://itunes.apple.com/search?term=${name}&entity=song&limit=10`
      );

      const data = await res.json();

      setSongs(data.results);

    };

    fetchSongs();

  }, [name]);

  return (

    <div className="p-6 md:p-8 w-full">

      <h1 className="text-3xl font-bold mb-8">
        {name} Top Songs
      </h1>

      <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-6
      ">

        {songs.map((song, index) => (

          <div
            key={index}
            className="
            bg-white/10
            backdrop-blur-md
            p-4
            rounded-xl
            flex
            flex-col sm:flex-row
            items-start sm:items-center
            gap-4
            "
          >

            <img
              src={song.artworkUrl100}
              alt={song.trackName}
              className="w-16 h-16 rounded-lg"
            />

            <div className="flex-1">

              <p className="font-semibold">
                {song.trackName}
              </p>

              <p className="text-sm text-gray-400">
                {song.collectionName}
              </p>

              <audio controls src={song.previewUrl} className="mt-2 w-full" />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default ArtistPage;