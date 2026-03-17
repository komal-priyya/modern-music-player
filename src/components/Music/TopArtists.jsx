// import React, { useState } from "react";
// // import ArtistCard from "./ArtistCard";
// import ArtistCardFloat from "./ArtistCardFloat";
// import ArtistCardPreview from "./ArtistCardPreview";
// // import ArtistCardFlip from "./ArtistCardFlip";
// // import ArtistCardPreview from "./ArtistCardPreview";

// //   const artists = [
// //   { name: "The Weeknd", image: "https://i.scdn.co/image/ab6761610000e5eb2d6dcdcf4d0b3c3d5e6c3a3f" },
// //   { name: "Drake", image: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9" },
// //   { name: "Arijit Singh", image: "https://i.scdn.co/image/ab6761610000e5ebfc8b6f4eec2a3f8b80b9dcd5" },
// //   { name: "Billie Eilish", image: "https://i.scdn.co/image/ab6761610000e5ebd8b998c2c508d57f075444ef" },

// //   { name: "Taylor Swift", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91" },
// //   { name: "Ed Sheeran", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4" },
// //   { name: "Dua Lipa", image: "https://images.unsplash.com/photo-1517232115160-ff93364542dd" },
// //   { name: "Justin Bieber", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9" },

// //   { name: "Ariana Grande", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" },
// //   { name: "Shreya Ghoshal", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
// //   { name: "Atif Aslam", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" },
// //   { name: "Bad Bunny", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12" },

// //   { name: "Post Malone", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
// //   { name: "Rihanna", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef" },
// //   { name: "Kanye West", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce" },
// //   { name: "Bruno Mars", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" },

// //   { name: "Neha Kakkar", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1" },
// //   { name: "Sonu Nigam", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" },
// //   { name: "Alan Walker", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
// //   { name: "Marshmello", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91" },

// //   { name: "Selena Gomez", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7" },
// //   { name: "Camila Cabello", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f" },
// //   { name: "Imagine Dragons", image: "https://images.unsplash.com/photo-1463453091185-61582044d556" },
// //   { name: "Coldplay", image: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f" }
// // ];

// const artists = [
// {
// name: "The Weeknd",
// image: "https://i.scdn.co/image/ab6761610000e5eb2d6dcdcf4d0b3c3d5e6c3a3f",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
// // ]
// },

// {
// name: "Drake",
// image: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
// // ]
// },

// {
// name: "Arijit Singh",
// image: "https://i.scdn.co/image/ab6761610000e5ebfc8b6f4eec2a3f8b80b9dcd5",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
// // ]
// },

// {
// name: "Billie Eilish",
// image: "https://i.scdn.co/image/ab6761610000e5ebd8b998c2c508d57f075444ef",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
// // ]
// },

// {
// name: "Taylor Swift",
// image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
// // ]
// },

// {
// name: "Ed Sheeran",
// image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
// // ]
// },

// {
// name: "Dua Lipa",
// image: "https://images.unsplash.com/photo-1517232115160-ff93364542dd",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
// // ]
// },

// {
// name: "Justin Bieber",
// image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
// // ]
// },

// {
// name: "Ariana Grande",
// image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
// // ]
// },

// {
// name: "Shreya Ghoshal",
// image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
// // ]
// },

// {
// name: "Atif Aslam",
// image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
// // ]
// },

// {
// name: "Bad Bunny",
// image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
// // ]
// },

// {
// name: "Post Malone",
// image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
// // ]
// },

// {
// name: "Rihanna",
// image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
// // ]
// },

// {
// name: "Kanye West",
// image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
// // ]
// },

// {
// name: "Bruno Mars",
// image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
// // ]
// },

// {
// name: "Neha Kakkar",
// image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
// // ]
// },

// {
// name: "Sonu Nigam",
// image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
// // ]
// },

// {
// name: "Alan Walker",
// image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
// // ]
// },

// {
// name: "Marshmello",
// image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
// // ]
// },

// {
// name: "Selena Gomez",
// image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
// // ]
// },

// {
// name: "Camila Cabello",
// image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
// // ]
// },

// {
// name: "Imagine Dragons",
// image: "https://images.unsplash.com/photo-1463453091185-61582044d556",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
// // ]
// },

// {
// name: "Coldplay",
// image: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f",
// // songs: [
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
// // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
// // ]
// }
// ];

// const TopArtists = () => {

//   const [currentPage, setCurrentPage] = useState(1);

//   const artistsPerPage = 5;

//   const lastIndex = currentPage * artistsPerPage;
//   const firstIndex = lastIndex - artistsPerPage;

//   const currentArtists = artists.slice(firstIndex, lastIndex);

//   const totalPages = Math.ceil(artists.length / artistsPerPage);

//   return (

//     <div>

//       <h2 className="text-2xl font-bold text-white mb-6">
//         Top Artists
//       </h2>

//       <div className="flex gap-6 flex-wrap">

//         {currentArtists.map((artist, index) => (
//           <ArtistCardPreview
//             key={index}
//             name={artist.name}
//             image={artist.image}
//           />
//         ))}

//       </div>

//       {/* Pagination */}

//       <div className="flex gap-4 mt-6">

//         {/* <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-40"
//         >
          
//         </button>

//         {/* <span className="text-white flex items-center">
//           Page {currentPage} / {totalPages}
//         </span> */}

//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-blue-300 text-white rounded disabled:opacity-40"
//         >
//           Next
//         </button> 



//         <div className="flex gap-2 mt-6 justify-center">

// {Array.from({ length: totalPages }).map((_, index) => (

// <button
// key={index}
// onClick={() => setCurrentPage(index + 1)}
// className={`w-3 h-3 rounded-full transition 
// ${currentPage === index + 1 
// ? "bg-blue-800 scale-125" 
// : "bg-zinc-400 hover:bg-zinc-600"}`}
// >

// </button>

// ))}

// </div>

//       </div>

//     </div>

//   );
// };

// export default TopArtists;

// import React, { useEffect, useState } from "react";
// import ArtistCardPreview from "./ArtistCardPreview";

// const artistNames = [
//   "arijit singh",
//   "shreya ghoshal",
//   "sonu nigam",
//   "atif aslam",
//   "drake",
//   "the weeknd",
//   "taylor swift",
//   "billie eilish"
// ];

// const TopArtists = () => {
//   const [artists, setArtists] = useState([]);

//   useEffect(() => {
//     const fetchArtists = async () => {
//       let list = [];

//       for (let name of artistNames) {
//         const response = await fetch(
//           `https://itunes.apple.com/search?term=${name}&entity=song&limit=10`
//         );

//         const data = await response.json();
// console.log(data.results);
//         if (data.results.length > 0) {
//           list.push({
//             name: data.results[0].artistName,
//             image: data.results[0].artworkUrl100,
//             songs: data.results
//               .map(song => song.previewUrl)
//               .filter(Boolean)
//           });
//         }
//       }

//       setArtists(list);
//     };

//     fetchArtists();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-white mb-6">
//         Top Artists
//       </h2>

//       <div className="flex flex-wrap gap-6">
//         {artists.map((artist, index) => (
//           <ArtistCardPreview
//             key={index}
//             artist={artist}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopArtists;
// import React, { useEffect, useState } from "react";
// import ArtistCardPreview from "./ArtistCardPreview";

// const artistData = [
//   {
//     name: "Arijit Singh",
//     image: "https://source.unsplash.com/300x300/?indian-singer,male"
//   },
//   {
//     name: "Shreya Ghoshal",
//     image: "https://source.unsplash.com/300x300/?female-singer,indian"
//   },
//   {
//     name: "Sonu Nigam",
//     image: "https://source.unsplash.com/300x300/?male-singer,concert"
//   },
//   {
//     name: "Armaan Malik",
//     image: "https://source.unsplash.com/300x300/?young-singer"
//   },
//   {
//     name: "Atif Aslam",
//     image: "https://source.unsplash.com/300x300/?pakistani-singer"
//   },
//   {
//     name: "Drake",
//     image: "https://source.unsplash.com/300x300/?rapper"
//   },
//   {
//     name: "The Weeknd",
//     image: "https://source.unsplash.com/300x300/?pop-singer"
//   },
//   {
//     name: "Taylor Swift",
//     image: "https://source.unsplash.com/300x300/?female-pop-star"
//   },
//   {
//     name: "Billie Eilish",
//     image: "https://source.unsplash.com/300x300/?female-artist"
//   },
//   {
//     name: "Ed Sheeran",
//     image: "https://source.unsplash.com/300x300/?guitar-singer"
//   },
//   {
//     name: "Ariana Grande",
//     image: "https://source.unsplash.com/300x300/?female-pop-singer"
//   }
// ];

// const TopArtists = () => {

//   const [artists, setArtists] = useState([]);
//   const [page, setPage] = useState(1);

//   const artistsPerPage = 5;

//   useEffect(() => {

//     const fetchArtists = async () => {

//       const list = await Promise.all(

//         artistData.map(async (artist) => {

//           const res = await fetch(
//             `https://itunes.apple.com/search?term=${artist.name}&entity=song&limit=10`
//           );

//           const data = await res.json();

//           return {
//             name: artist.name,
//             image: artist.image,
//             songs: data.results
//               .map(song => song.previewUrl)
//               .filter(Boolean)
//           };

//         })

//       );

//       setArtists(list);

//     };

//     fetchArtists();

//   }, []);

//   const startIndex = (page - 1) * artistsPerPage;

//   const currentArtists =
//     artists.slice(startIndex, startIndex + artistsPerPage);

//   return (

//     <div>

//       <h2 className="text-2xl font-bold  mb-6">
//         Top Artists
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-6">
//   {currentArtists.map((artist, index) => (
//     <ArtistCardPreview key={index} artist={artist} />
//   ))}
// </div>
//       <div className="flex gap-4 mt-8">

//         <button
//           onClick={() => setPage(page - 1)}
//           disabled={page === 1}
//           className="bg-zinc-800 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <button
//           onClick={() => setPage(page + 1)}
//           disabled={startIndex + artistsPerPage >= artists.length}
//           className="bg-zinc-800 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           Next
//         </button>

//       </div>

//     </div>

//   );

// };

// export default TopArtists;

import React, { useEffect, useState } from "react";
import ArtistCardPreview from "./ArtistCardPreview";

const artistData = [

  { name: "Arijit Singh", image: "https://source.unsplash.com/300x300/?indian-singer,male" },
  { name: "Shreya Ghoshal", image: "https://source.unsplash.com/300x300/?female-singer,indian" },
  { name: "Sonu Nigam", image: "https://source.unsplash.com/300x300/?male-singer,concert" },
  { name: "Armaan Malik", image: "https://source.unsplash.com/300x300/?young-singer" },
  { name: "Atif Aslam", image: "https://source.unsplash.com/300x300/?pakistani-singer" },
  { name: "Drake", image: "https://source.unsplash.com/300x300/?rapper" },
  { name: "The Weeknd", image: "https://source.unsplash.com/300x300/?pop-singer" },
  { name: "Taylor Swift", image: "https://source.unsplash.com/300x300/?female-pop-star" },
  { name: "Billie Eilish", image: "https://source.unsplash.com/300x300/?female-artist" },
  { name: "Ed Sheeran", image: "https://source.unsplash.com/300x300/?guitar-singer" },
  { name: "Ariana Grande", image: "https://source.unsplash.com/300x300/?female-pop-singer" }

];

const TopArtists = () => {

  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const artistsPerPage = 5;

  useEffect(() => {

    const fetchArtists = async () => {

      const list = await Promise.all(

        artistData.map(async (artist) => {

          const res = await fetch(
            `https://itunes.apple.com/search?term=${artist.name}&entity=song&limit=10`
          );

          const data = await res.json();

          return {
            name: artist.name,
            image: artist.image,
            songs: data.results.map(song => song.previewUrl).filter(Boolean)
          };

        })

      );

      setArtists(list);

    };

    fetchArtists();

  }, []);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (page - 1) * artistsPerPage;

  const currentArtists =
    filteredArtists.slice(startIndex, startIndex + artistsPerPage);

  return (

    <div className="w-full">

      {/* Header + Search */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <h2 className="text-2xl md:text-3xl font-bold">
          Top Artists
        </h2>

        <input
          type="text"
          placeholder="Search artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-full sm:w-64
          px-4 py-2
          rounded-xl
          border border-gray-200
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-indigo-400
          "
        />

      </div>

      {/* Artist Grid */}

      <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-6
      ">

        {currentArtists.map((artist, index) => (
          <ArtistCardPreview key={index} artist={artist} />
        ))}

      </div>

      {/* Pagination */}

      <div className="flex flex-wrap justify-center gap-4 mt-10">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="
          bg-zinc-800 text-white
          px-5 py-2 rounded-lg
          hover:bg-zinc-700
          transition
          disabled:opacity-50
          "
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={startIndex + artistsPerPage >= filteredArtists.length}
          className="
          bg-zinc-800 text-white
          px-5 py-2 rounded-lg
          hover:bg-zinc-700
          transition
          disabled:opacity-50
          "
        >
          Next
        </button>

      </div>

    </div>

  );

};

export default TopArtists;