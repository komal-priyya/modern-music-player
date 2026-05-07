// const ITUNES_BASE_URL = "https://itunes.apple.com";
// const MUSIC_BRAINZ_BASE_URL = "https://musicbrainz.org/ws/2";
// const RADIO_BROWSER_BASE_URL = "https://de1.api.radio-browser.info/json";

// const featuredArtistNames = [
//   "Arijit Singh",
//   "The Weeknd",
//   "Shreya Ghoshal",
//   "Taylor Swift",
//   "Anirudh Ravichander",
//   "Billie Eilish",
//   "AP Dhillon",
//   "Dua Lipa",
// ];

// const homeQueries = ["global hits", "indie chill", "bollywood love", "afrobeats", "night drive"];

// function toDurationLabel(durationMs) {
//   if (!durationMs) {
//     return "Preview";
//   }
//   const totalSeconds = Math.floor(durationMs / 1000);
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = `${totalSeconds % 60}`.padStart(2, "0");
//   return `${minutes}:${seconds}`;
// }

// function normalizeTrack(track) {
//   const audioUrl = track.fullTrackUrl || track.previewUrl || "";

//   return {
//     id: `${track.trackId || track.collectionId}-${track.previewUrl || track.trackName}`,
//     title: track.trackName || track.collectionName || "Untitled track",
//     artist: track.artistName || "Unknown artist",
//     album: track.collectionName || "Single",
//     artwork:
//       track.artworkUrl100?.replace("100x100", "600x600") ||
//       track.artworkUrl60 ||
//       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
//     audioUrl,
//     previewUrl: track.previewUrl,
//     genre: track.primaryGenreName || "Mixed",
//     year: track.releaseDate ? new Date(track.releaseDate).getFullYear() : "",
//     durationLabel: toDurationLabel(track.trackTimeMillis),
//     releaseDate: track.releaseDate || "",
//     sourceLabel: "iTunes",
//   };
// }

// function normalizeArtist(name, tracks, context) {
//   return {
//     id: `${name}-${tracks[0]?.id || "artist"}`,
//     name,
//     image:
//       tracks[0]?.artwork ||
//       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
//     tracks,
//     trackCount: tracks.length,
//     country: context?.country || "",
//     tagline: context?.tags?.[0] || tracks[0]?.genre || "Artist preview",
//     primaryGenre: tracks[0]?.genre || "Mixed",
//   };
// }

// async function safeFetchJson(url) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Request failed with status ${response.status}`);
//   }
//   return response.json();
// }










//   const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(
//     query
//   )}&entity=song&limit=${limit}`;
//   const data = await safeFetchJson(url);
//   return (data.results || []).filter((track) => track.previewUrl).map(normalizeTrack);


// export async function searchArtists(query, limit = 8) {
//   const tracks = await searchTracks(query, limit * 2);
//   const names = [...new Set(tracks.map((track) => track.artist))].slice(0, limit);
//   const artists = await Promise.all(
//     names.map(async (name) => {
//       const artistTracks = tracks.filter((track) => track.artist === name).slice(0, 5);
//       const context = await getArtistContext(name);
//       return normalizeArtist(name, artistTracks, context);
//     })
//   );
//   return artists;
// }

// export async function getArtistTopTracks(artistName) {
//   const tracks = await searchTracks(artistName, 14);
//   return tracks
//     .filter((track) => track.artist.toLowerCase().includes(artistName.toLowerCase()))
//     .slice(0, 10);
// }

// export async function getArtistContext(artistName) {
//   if (!artistName) {
//     return null;
//   }

//   try {
//     const url = `${MUSIC_BRAINZ_BASE_URL}/artist?query=${encodeURIComponent(
//       `artist:${artistName}`
//     )}&fmt=json&limit=1`;
//     const data = await safeFetchJson(url);
//     const artist = data.artists?.[0];
//     if (!artist) {
//       return null;
//     }

//     const tags = (artist.tags || []).slice(0, 5).map((tag) => tag.name);
//     return {
//       country: artist.country || "",
//       tags,
//       summary: tags.length
//         ? `${artistName} surfaces through ${tags.join(", ")} with a cross-market listening profile.`
//         : `${artistName} is available here with preview tracks and radio-style exploration.`,
//     };
//   } catch {
//     return null;
//   }
// }

// export async function getFeaturedArtists() {
//   const artists = await Promise.all(
//     featuredArtistNames.map(async (name) => {
//       const [tracks, context] = await Promise.all([searchTracks(name, 6), getArtistContext(name)]);
//       return normalizeArtist(name, tracks.slice(0, 4), context);
//     })
//   );

//   return artists.filter((artist) => artist.tracks.length);
// }

// export async function getTrendingTracks() {
//   const resultSets = await Promise.all(homeQueries.map((query) => searchTracks(query, 6)));
//   return resultSets.flat().slice(0, 12);
// }

// export async function getRadioStations({ query = "", limit = 6 } = {}) {
//   const path = query?.trim()
//     ? `${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}&limit=${limit}`
//     : `${RADIO_BROWSER_BASE_URL}/stations/topclick/${limit}`;
//   const data = await safeFetchJson(path);

//   return (data || [])
//     .filter((station) => station.url_resolved || station.url)
//     .map((station) => ({
//       id: station.stationuuid,
//       title: station.name,
//       artist: station.country || "Live radio",
//       album: station.language || "Radio",
//       artwork:
//         "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=900&q=80",
//       audioUrl: station.url_resolved || station.url,
//       previewUrl: "",
//       streamUrl: station.url_resolved || station.url,
//       genre: station.tags || "Radio",
//       year: "",
//       durationLabel: "Live",
//       sourceLabel: "Radio Browser",
//     }));
// }

// export async function getHomeStations() {
//   return getRadioStations({ query: "chill", limit: 4 });
// }

// function dedupeJourneyTracks(tracks) {
//   const seen = new Set();
//   return tracks.filter((track) => {
//     if (!track?.id || seen.has(track.id)) {
//       return false;
//     }
//     seen.add(track.id);
//     return true;
//   });
// }

// export async function buildBlendJourney({ fromArtist, toArtist, mood }) {
//   const [originTracks, destinationTracks, originContext, destinationContext] = await Promise.all([
//     searchTracks(fromArtist || mood, 8),
//     searchTracks(toArtist || mood, 8),
//     getArtistContext(fromArtist),
//     getArtistContext(toArtist),
//   ]);

//   const bridgeQuery =
//     originContext?.tags?.find((tag) => destinationContext?.tags?.includes(tag)) ||
//     mood ||
//     "global fusion";
//   const bridgeTracks = await searchTracks(bridgeQuery, 6);

//   const tracks = dedupeJourneyTracks([
//     ...originTracks.slice(0, 3),
//     ...bridgeTracks.slice(0, 3),
//     ...destinationTracks.slice(0, 4),
//   ]);

//   return {
//     id: `journey-${Date.now()}`,
//     title: `${fromArtist || mood} to ${toArtist || mood}`,
//     summary: `Starts with ${fromArtist || mood}, threads through ${
//       bridgeQuery || "a matching connective sound"
//     }, and lands on ${toArtist || mood}.`,
//     bridgeLabel: bridgeQuery,
//     tracks,
//     stages: [
//       `Launch with ${fromArtist || mood}`,
//       `Bridge using ${bridgeQuery}`,
//       `Land on ${toArtist || mood}`,
//     ],
//   };
// }

///////////////////////////////////////////////////////////////////
// // const ITUNES_BASE_URL = "https://itunes.apple.com";
// // const MUSIC_BRAINZ_BASE_URL = "https://musicbrainz.org/ws/2";
// // const RADIO_BROWSER_BASE_URL = "https://de1.api.radio-browser.info/json";
// // // const CORS_PROXY = "https://corsproxy.io/?";
// // const CORS_PROXY = "https://api.allorigins.win/raw?url=";

// // const featuredArtistNames = [
// //   "Arijit Singh",
// //   "The Weeknd",
// //   "Shreya Ghoshal",
// //   "Taylor Swift",
// //   "Anirudh Ravichander",
// //   "Billie Eilish",
// //   "AP Dhillon",
// //   "Dua Lipa",
// // ];

// // const homeQueries = ["global hits", "indie chill", "bollywood love", "afrobeats", "night drive"];

// // function toDurationLabel(durationMs) {
// //   if (!durationMs) {
// //     return "Preview";
// //   }
// //   const totalSeconds = Math.floor(durationMs / 1000);
// //   const minutes = Math.floor(totalSeconds / 60);
// //   const seconds = `${totalSeconds % 60}`.padStart(2, "0");
// //   return `${minutes}:${seconds}`;
// // }

// // function normalizeTrack(track) {
// //   const audioUrl = track.fullTrackUrl || track.previewUrl || "";

// //   return {
// //     id: `${track.trackId || track.collectionId}-${track.previewUrl || track.trackName}`,
// //     title: track.trackName || track.collectionName || "Untitled track",
// //     artist: track.artistName || "Unknown artist",
// //     album: track.collectionName || "Single",
// //     artwork:
// //       track.artworkUrl100?.replace("100x100", "600x600") ||
// //       track.artworkUrl60 ||
// //       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
// //     audioUrl,
// //     previewUrl: track.previewUrl,
// //     genre: track.primaryGenreName || "Mixed",
// //     year: track.releaseDate ? new Date(track.releaseDate).getFullYear() : "",
// //     durationLabel: toDurationLabel(track.trackTimeMillis),
// //     releaseDate: track.releaseDate || "",
// //     sourceLabel: "iTunes",
// //   };
// // }

// // function normalizeArtist(name, tracks, context) {
// //   return {
// //     id: `${name}-${tracks[0]?.id || "artist"}`,
// //     name,
// //     image:
// //       tracks[0]?.artwork ||
// //       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
// //     tracks,
// //     trackCount: tracks.length,
// //     country: context?.country || "",
// //     tagline: context?.tags?.[0] || tracks[0]?.genre || "Artist preview",
// //     primaryGenre: tracks[0]?.genre || "Mixed",
// //   };
// // }

// // async function safeFetchJson(url) {
// //   const proxiedUrl = url.startsWith("https://itunes.apple.com")
// //     ? `${CORS_PROXY}${encodeURIComponent(url)}`
// //     : url;

// //   const response = await fetch(proxiedUrl);
// //   if (!response.ok) {
// //     throw new Error(`Request failed with status ${response.status}`);
// //   }
// //   return response.json();
// // }

// // export async function searchTracks(query, limit = 12) {
// //   if (!query?.trim()) {
// //     return [];
// //   }

// //   const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(
// //     query
// //   )}&entity=song&limit=${limit}`;
// //   const data = await safeFetchJson(url);
// //   return (data.results || []).filter((track) => track.previewUrl).map(normalizeTrack);
// // }

// // export async function searchArtists(query, limit = 8) {
// //   const tracks = await searchTracks(query, limit * 2);
// //   const names = [...new Set(tracks.map((track) => track.artist))].slice(0, limit);
// //   const artists = await Promise.all(
// //     names.map(async (name) => {
// //       const artistTracks = tracks.filter((track) => track.artist === name).slice(0, 5);
// //       const context = await getArtistContext(name);
// //       return normalizeArtist(name, artistTracks, context);
// //     })
// //   );
// //   return artists;
// // }

// // export async function getArtistTopTracks(artistName) {
// //   const tracks = await searchTracks(artistName, 14);
// //   return tracks
// //     .filter((track) => track.artist.toLowerCase().includes(artistName.toLowerCase()))
// //     .slice(0, 10);
// // }

// // export async function getArtistContext(artistName) {
// //   if (!artistName) {
// //     return null;
// //   }

// //   try {
// //     const url = `${MUSIC_BRAINZ_BASE_URL}/artist?query=${encodeURIComponent(
// //       `artist:${artistName}`
// //     )}&fmt=json&limit=1`;
// //     const data = await safeFetchJson(url);
// //     const artist = data.artists?.[0];
// //     if (!artist) {
// //       return null;
// //     }

// //     const tags = (artist.tags || []).slice(0, 5).map((tag) => tag.name);
// //     return {
// //       country: artist.country || "",
// //       tags,
// //       summary: tags.length
// //         ? `${artistName} surfaces through ${tags.join(", ")} with a cross-market listening profile.`
// //         : `${artistName} is available here with preview tracks and radio-style exploration.`,
// //     };
// //   } catch {
// //     return null;
// //   }
// // }

// // export async function getFeaturedArtists() {
// //   const artists = await Promise.all(
// //     featuredArtistNames.map(async (name) => {
// //       const [tracks, context] = await Promise.all([searchTracks(name, 6), getArtistContext(name)]);
// //       return normalizeArtist(name, tracks.slice(0, 4), context);
// //     })
// //   );

// //   return artists.filter((artist) => artist.tracks.length);
// // }

// // export async function getTrendingTracks() {
// //   const resultSets = await Promise.all(homeQueries.map((query) => searchTracks(query, 6)));
// //   return resultSets.flat().slice(0, 12);
// // }

// // export async function getRadioStations({ query = "", limit = 6 } = {}) {
// //   const path = query?.trim()
// //     ? `${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}&limit=${limit}`
// //     : `${RADIO_BROWSER_BASE_URL}/stations/topclick/${limit}`;
// //   const data = await safeFetchJson(path);

// //   return (data || [])
// //     .filter((station) => station.url_resolved || station.url)
// //     .map((station) => ({
// //       id: station.stationuuid,
// //       title: station.name,
// //       artist: station.country || "Live radio",
// //       album: station.language || "Radio",
// //       artwork:
// //         "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=900&q=80",
// //       audioUrl: station.url_resolved || station.url,
// //       previewUrl: "",
// //       streamUrl: station.url_resolved || station.url,
// //       genre: station.tags || "Radio",
// //       year: "",
// //       durationLabel: "Live",
// //       sourceLabel: "Radio Browser",
// //     }));
// // }

// // export async function getHomeStations() {
// //   return getRadioStations({ query: "chill", limit: 4 });
// // }

// // function dedupeJourneyTracks(tracks) {
// //   const seen = new Set();
// //   return tracks.filter((track) => {
// //     if (!track?.id || seen.has(track.id)) {
// //       return false;
// //     }
// //     seen.add(track.id);
// //     return true;
// //   });
// // }

// // export async function buildBlendJourney({ fromArtist, toArtist, mood }) {
// //   const [originTracks, destinationTracks, originContext, destinationContext] = await Promise.all([
// //     searchTracks(fromArtist || mood, 8),
// //     searchTracks(toArtist || mood, 8),
// //     getArtistContext(fromArtist),
// //     getArtistContext(toArtist),
// //   ]);

// //   const bridgeQuery =
// //     originContext?.tags?.find((tag) => destinationContext?.tags?.includes(tag)) ||
// //     mood ||
// //     "global fusion";
// //   const bridgeTracks = await searchTracks(bridgeQuery, 6);

// //   const tracks = dedupeJourneyTracks([
// //     ...originTracks.slice(0, 3),
// //     ...bridgeTracks.slice(0, 3),
// //     ...destinationTracks.slice(0, 4),
// //   ]);

// //   return {
// //     id: `journey-${Date.now()}`,
// //     title: `${fromArtist || mood} to ${toArtist || mood}`,
// //     summary: `Starts with ${fromArtist || mood}, threads through ${
// //       bridgeQuery || "a matching connective sound"
// //     }, and lands on ${toArtist || mood}.`,
// //     bridgeLabel: bridgeQuery,
// //     tracks,
// //     stages: [
// //       `Launch with ${fromArtist || mood}`,
// //       `Bridge using ${bridgeQuery}`,
// //       `Land on ${toArtist || mood}`,
// //     ],
// //   };
// // }
// // const ITUNES_BASE_URL = "https://itunes.apple.com";
// // const MUSIC_BRAINZ_BASE_URL = "https://musicbrainz.org/ws/2";
// // const RADIO_BROWSER_BASE_URL = "https://de1.api.radio-browser.info/json";

// // const featuredArtistNames = [
// //   "Arijit Singh",
// //   "The Weeknd",
// //   "Shreya Ghoshal",
// //   "Taylor Swift",
// //   "Anirudh Ravichander",
// //   "Billie Eilish",
// //   "AP Dhillon",
// //   "Dua Lipa",
// // ];

// // const homeQueries = ["global hits", "indie chill", "bollywood love", "afrobeats", "night drive"];

// // function toDurationLabel(durationMs) {
// //   if (!durationMs) {
// //     return "Preview";
// //   }
// //   const totalSeconds = Math.floor(durationMs / 1000);
// //   const minutes = Math.floor(totalSeconds / 60);
// //   const seconds = `${totalSeconds % 60}`.padStart(2, "0");
// //   return `${minutes}:${seconds}`;
// // }

// // function normalizeTrack(track) {
// //   const audioUrl = track.fullTrackUrl || track.previewUrl || "";

// //   return {
// //     id: `${track.trackId || track.collectionId}-${track.previewUrl || track.trackName}`,
// //     title: track.trackName || track.collectionName || "Untitled track",
// //     artist: track.artistName || "Unknown artist",
// //     album: track.collectionName || "Single",
// //     artwork:
// //       track.artworkUrl100?.replace("100x100", "600x600") ||
// //       track.artworkUrl60 ||
// //       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
// //     audioUrl,
// //     previewUrl: track.previewUrl,
// //     genre: track.primaryGenreName || "Mixed",
// //     year: track.releaseDate ? new Date(track.releaseDate).getFullYear() : "",
// //     durationLabel: toDurationLabel(track.trackTimeMillis),
// //     releaseDate: track.releaseDate || "",
// //     sourceLabel: "iTunes",
// //   };
// // }

// // function normalizeArtist(name, tracks, context) {
// //   return {
// //     id: `${name}-${tracks[0]?.id || "artist"}`,
// //     name,
// //     image:
// //       tracks[0]?.artwork ||
// //       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
// //     tracks,
// //     trackCount: tracks.length,
// //     country: context?.country || "",
// //     tagline: context?.tags?.[0] || tracks[0]?.genre || "Artist preview",
// //     primaryGenre: tracks[0]?.genre || "Mixed",
// //   };
// // }

// // // JSONP - bypasses CORS natively, no proxy needed
// // function fetchItunesJsonp(url) {
// //   return new Promise((resolve, reject) => {
// //     const callbackName = `itunes_cb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
// //     const script = document.createElement("script");

// //     const timeout = setTimeout(() => {
// //       cleanup();
// //       reject(new Error("iTunes request timed out"));
// //     }, 10000);

// //     function cleanup() {
// //       clearTimeout(timeout);
// //       delete window[callbackName];
// //       if (script.parentNode) {
// //         script.parentNode.removeChild(script);
// //       }
// //     }

// //     window[callbackName] = (data) => {
// //       cleanup();
// //       resolve(data);
// //     };

// //     script.src = `${url}&callback=${callbackName}`;
// //     script.onerror = () => {
// //       cleanup();
// //       reject(new Error("iTunes JSONP request failed"));
// //     };

// //     document.head.appendChild(script);
// //   });
// // }

// // async function safeFetchJson(url) {
// //   const response = await fetch(url);
// //   if (!response.ok) {
// //     throw new Error(`Request failed with status ${response.status}`);
// //   }
// //   return response.json();
// // }

// // export async function searchTracks(query, limit = 12) {
// //   if (!query?.trim()) {
// //     return [];
// //   }

// //   const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(
// //     query
// //   )}&entity=song&limit=${limit}`;

// //   const data = await fetchItunesJsonp(url);
// //   return (data.results || []).filter((track) => track.previewUrl).map(normalizeTrack);
// // }

// // export async function searchArtists(query, limit = 8) {
// //   const tracks = await searchTracks(query, limit * 2);
// //   const names = [...new Set(tracks.map((track) => track.artist))].slice(0, limit);
// //   const artists = await Promise.all(
// //     names.map(async (name) => {
// //       const artistTracks = tracks.filter((track) => track.artist === name).slice(0, 5);
// //       const context = await getArtistContext(name);
// //       return normalizeArtist(name, artistTracks, context);
// //     })
// //   );
// //   return artists;
// // }

// // export async function getArtistTopTracks(artistName) {
// //   const tracks = await searchTracks(artistName, 14);
// //   return tracks
// //     .filter((track) => track.artist.toLowerCase().includes(artistName.toLowerCase()))
// //     .slice(0, 10);
// // }

// // export async function getArtistContext(artistName) {
// //   if (!artistName) {
// //     return null;
// //   }

// //   try {
// //     const url = `${MUSIC_BRAINZ_BASE_URL}/artist?query=${encodeURIComponent(
// //       `artist:${artistName}`
// //     )}&fmt=json&limit=1`;
// //     const data = await safeFetchJson(url);
// //     const artist = data.artists?.[0];
// //     if (!artist) {
// //       return null;
// //     }

// //     const tags = (artist.tags || []).slice(0, 5).map((tag) => tag.name);
// //     return {
// //       country: artist.country || "",
// //       tags,
// //       summary: tags.length
// //         ? `${artistName} surfaces through ${tags.join(", ")} with a cross-market listening profile.`
// //         : `${artistName} is available here with preview tracks and radio-style exploration.`,
// //     };
// //   } catch {
// //     return null;
// //   }
// // }

// // export async function getFeaturedArtists() {
// //   const artists = await Promise.all(
// //     featuredArtistNames.map(async (name) => {
// //       const [tracks, context] = await Promise.all([searchTracks(name, 6), getArtistContext(name)]);
// //       return normalizeArtist(name, tracks.slice(0, 4), context);
// //     })
// //   );

// //   return artists.filter((artist) => artist.tracks.length);
// // }

// // export async function getTrendingTracks() {
// //   const resultSets = await Promise.all(homeQueries.map((query) => searchTracks(query, 6)));
// //   return resultSets.flat().slice(0, 12);
// // }

// // export async function getRadioStations({ query = "", limit = 6 } = {}) {
// //   const path = query?.trim()
// //     ? `${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}&limit=${limit}`
// //     : `${RADIO_BROWSER_BASE_URL}/stations/topclick/${limit}`;
// //   const data = await safeFetchJson(path);

// //   return (data || [])
// //     .filter((station) => station.url_resolved || station.url)
// //     .map((station) => ({
// //       id: station.stationuuid,
// //       title: station.name,
// //       artist: station.country || "Live radio",
// //       album: station.language || "Radio",
// //       artwork:
// //         "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=900&q=80",
// //       audioUrl: station.url_resolved || station.url,
// //       previewUrl: "",
// //       streamUrl: station.url_resolved || station.url,
// //       genre: station.tags || "Radio",
// //       year: "",
// //       durationLabel: "Live",
// //       sourceLabel: "Radio Browser",
// //     }));
// // }

// // export async function getHomeStations() {
// //   return getRadioStations({ query: "chill", limit: 4 });
// // }

// // function dedupeJourneyTracks(tracks) {
// //   const seen = new Set();
// //   return tracks.filter((track) => {
// //     if (!track?.id || seen.has(track.id)) {
// //       return false;
// //     }
// //     seen.add(track.id);
// //     return true;
// //   });
// // }

// // export async function buildBlendJourney({ fromArtist, toArtist, mood }) {
// //   const [originTracks, destinationTracks, originContext, destinationContext] = await Promise.all([
// //     searchTracks(fromArtist || mood, 8),
// //     searchTracks(toArtist || mood, 8),
// //     getArtistContext(fromArtist),
// //     getArtistContext(toArtist),
// //   ]);

// //   const bridgeQuery =
// //     originContext?.tags?.find((tag) => destinationContext?.tags?.includes(tag)) ||
// //     mood ||
// //     "global fusion";
// //   const bridgeTracks = await searchTracks(bridgeQuery, 6);

// //   const tracks = dedupeJourneyTracks([
// //     ...originTracks.slice(0, 3),
// //     ...bridgeTracks.slice(0, 3),
// //     ...destinationTracks.slice(0, 4),
// //   ]);

// //   return {
// //     id: `journey-${Date.now()}`,
// //     title: `${fromArtist || mood} to ${toArtist || mood}`,
// //     summary: `Starts with ${fromArtist || mood}, threads through ${
// //       bridgeQuery || "a matching connective sound"
// //     }, and lands on ${toArtist || mood}.`,
// //     bridgeLabel: bridgeQuery,
// //     tracks,
// //     stages: [
// //       `Launch with ${fromArtist || mood}`,
// //       `Bridge using ${bridgeQuery}`,
// //       `Land on ${toArtist || mood}`,
// //     ],
// //   };
// // }


// const ITUNES_BASE_URL = "https://itunes.apple.com";
// const MUSIC_BRAINZ_BASE_URL = "https://musicbrainz.org/ws/2";
// const RADIO_BROWSER_BASE_URL = "https://de1.api.radio-browser.info/json";

// const featuredArtistNames = [
//   "Arijit Singh",
//   "The Weeknd",
//   "Shreya Ghoshal",
//   "Taylor Swift",
//   "Anirudh Ravichander",
//   "Billie Eilish",
//   "AP Dhillon",
//   "Dua Lipa",
// ];

// const homeQueries = ["global hits", "indie chill", "bollywood love", "afrobeats", "night drive"];

// function toDurationLabel(durationMs) {
//   if (!durationMs) return "Preview";
//   const totalSeconds = Math.floor(durationMs / 1000);
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = `${totalSeconds % 60}`.padStart(2, "0");
//   return `${minutes}:${seconds}`;
// }

// function normalizeTrack(track) {
//   const audioUrl = track.fullTrackUrl || track.previewUrl || "";
//   return {
//     id: `${track.trackId || track.collectionId}-${track.previewUrl || track.trackName}`,
//     title: track.trackName || track.collectionName || "Untitled track",
//     artist: track.artistName || "Unknown artist",
//     album: track.collectionName || "Single",
//     artwork:
//       track.artworkUrl100?.replace("100x100", "600x600") ||
//       track.artworkUrl60 ||
//       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
//     audioUrl,
//     previewUrl: track.previewUrl,
//     genre: track.primaryGenreName || "Mixed",
//     year: track.releaseDate ? new Date(track.releaseDate).getFullYear() : "",
//     durationLabel: toDurationLabel(track.trackTimeMillis),
//     releaseDate: track.releaseDate || "",
//     sourceLabel: "iTunes",
//   };
// }

// function normalizeArtist(name, tracks, context) {
//   return {
//     id: `${name}-${tracks[0]?.id || "artist"}`,
//     name,
//     image:
//       tracks[0]?.artwork ||
//       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
//     tracks,
//     trackCount: tracks.length,
//     country: context?.country || "",
//     tagline: context?.tags?.[0] || tracks[0]?.genre || "Artist preview",
//     primaryGenre: tracks[0]?.genre || "Mixed",
//   };
// }

// function fetchItunesJsonp(url) {
//   return new Promise((resolve, reject) => {
//     const callbackName = `itunes_cb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
//     const script = document.createElement("script");

//     const timeout = setTimeout(() => {
//       cleanup();
//       reject(new Error("iTunes request timed out"));
//     }, 10000);

//     function cleanup() {
//       clearTimeout(timeout);
//       delete window[callbackName];
//       if (script.parentNode) script.parentNode.removeChild(script);
//     }

//     window[callbackName] = (data) => {
//       cleanup();
//       resolve(data);
//     };

//     script.src = `${url}&callback=${callbackName}`;
//     script.onerror = () => {
//       cleanup();
//       reject(new Error("iTunes JSONP request failed"));
//     };

//     document.head.appendChild(script);
//   });
// }

// async function safeFetchJson(url) {
//   const response = await fetch(url);
//   if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
//   return response.json();
// }

// export async function searchTracks(query, limit = 12) {
//   if (!query?.trim()) return [];
//   const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(query)}&entity=song&limit=${limit}`;
//   const data = await fetchItunesJsonp(url);
//   return (data.results || []).filter((track) => track.previewUrl).map(normalizeTrack);
// }

// export async function searchArtists(query, limit = 8) {
//   const tracks = await searchTracks(query, limit * 2);
//   const names = [...new Set(tracks.map((track) => track.artist))].slice(0, limit);
//   const artists = await Promise.all(
//     names.map(async (name) => {
//       const artistTracks = tracks.filter((track) => track.artist === name).slice(0, 5);
//       const context = await getArtistContext(name);
//       return normalizeArtist(name, artistTracks, context);
//     })
//   );
//   return artists;
// }

// export async function getArtistTopTracks(artistName) {
//   const tracks = await searchTracks(artistName, 14);
//   return tracks
//     .filter((track) => track.artist.toLowerCase().includes(artistName.toLowerCase()))
//     .slice(0, 10);
// }

// export async function getArtistContext(artistName) {
//   if (!artistName) return null;
//   try {
//     const url = `${MUSIC_BRAINZ_BASE_URL}/artist?query=${encodeURIComponent(`artist:${artistName}`)}&fmt=json&limit=1`;
//     const data = await safeFetchJson(url);
//     const artist = data.artists?.[0];
//     if (!artist) return null;
//     const tags = (artist.tags || []).slice(0, 5).map((tag) => tag.name);
//     return {
//       country: artist.country || "",
//       tags,
//       summary: tags.length
//         ? `${artistName} surfaces through ${tags.join(", ")} with a cross-market listening profile.`
//         : `${artistName} is available here with preview tracks and radio-style exploration.`,
//     };
//   } catch {
//     return null;
//   }
// }

// export async function getFeaturedArtists() {
//   const artists = await Promise.all(
//     featuredArtistNames.map(async (name) => {
//       const [tracks, context] = await Promise.all([searchTracks(name, 6), getArtistContext(name)]);
//       return normalizeArtist(name, tracks.slice(0, 4), context);
//     })
//   );
//   return artists.filter((artist) => artist.tracks.length);
// }

// export async function getTrendingTracks() {
//   const resultSets = await Promise.all(homeQueries.map((query) => searchTracks(query, 6)));
//   return resultSets.flat().slice(0, 12);
// }

// export async function getRadioStations({ query = "", limit = 6 } = {}) {
//   const path = query?.trim()
//     ? `${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}&limit=${limit}`
//     : `${RADIO_BROWSER_BASE_URL}/stations/topclick/${limit}`;
//   const data = await safeFetchJson(path);
//   return (data || [])
//     .filter((station) => station.url_resolved || station.url)
//     .map((station) => ({
//       id: station.stationuuid,
//       title: station.name,
//       artist: station.country || "Live radio",
//       album: station.language || "Radio",
//       artwork:
//         "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=900&q=80",
//       audioUrl: station.url_resolved || station.url,
//       previewUrl: "",
//       streamUrl: station.url_resolved || station.url,
//       genre: station.tags || "Radio",
//       year: "",
//       durationLabel: "Live",
//       sourceLabel: "Radio Browser",
//     }));
// }

// export async function getHomeStations() {
//   return getRadioStations({ query: "chill", limit: 4 });
// }

// function dedupeJourneyTracks(tracks) {
//   const seen = new Set();
//   return tracks.filter((track) => {
//     if (!track?.id || seen.has(track.id)) return false;
//     seen.add(track.id);
//     return true;
//   });
// }

// export async function buildBlendJourney({ fromArtist, toArtist, mood }) {
//   const [originTracks, destinationTracks, originContext, destinationContext] = await Promise.all([
//     searchTracks(fromArtist || mood, 8),
//     searchTracks(toArtist || mood, 8),
//     getArtistContext(fromArtist),
//     getArtistContext(toArtist),
//   ]);

//   const bridgeQuery =
//     originContext?.tags?.find((tag) => destinationContext?.tags?.includes(tag)) ||
//     mood ||
//     "global fusion";
//   const bridgeTracks = await searchTracks(bridgeQuery, 6);

//   const tracks = dedupeJourneyTracks([
//     ...originTracks.slice(0, 3),
//     ...bridgeTracks.slice(0, 3),
//     ...destinationTracks.slice(0, 4),
//   ]);

//   return {
//     id: `journey-${Date.now()}`,
//     title: `${fromArtist || mood} to ${toArtist || mood}`,
//     summary: `Starts with ${fromArtist || mood}, threads through ${bridgeQuery || "a matching connective sound"}, and lands on ${toArtist || mood}.`,
//     bridgeLabel: bridgeQuery,
//     tracks,
//     stages: [
//       `Launch with ${fromArtist || mood}`,
//       `Bridge using ${bridgeQuery}`,
//       `Land on ${toArtist || mood}`,
//     ],
//   };
// }

/////////////////////////////////////////////////////////////////


// const ITUNES_BASE_URL = "https://itunes.apple.com";
// const MUSIC_BRAINZ_BASE_URL = "https://musicbrainz.org/ws/2";
// const RADIO_BROWSER_BASE_URL = "https://de1.api.radio-browser.info/json";

// const featuredArtistNames = [
//   "Arijit Singh",
//   "The Weeknd",
//   "Shreya Ghoshal",
//   "Taylor Swift",
//   "Anirudh Ravichander",
//   "Billie Eilish",
//   "AP Dhillon",
//   "Dua Lipa",
// ];

// const homeQueries = ["global hits", "indie chill", "bollywood love", "afrobeats", "night drive"];

// function toDurationLabel(durationMs) {
//   if (!durationMs) {
//     return "Preview";
//   }

//   const totalSeconds = Math.floor(durationMs / 1000);
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = `${totalSeconds % 60}`.padStart(2, "0");
//   return `${minutes}:${seconds}`;
// }

// function normalizeTrack(track) {
//   const audioUrl = track.fullTrackUrl || track.previewUrl || "";

//   return {
//     id: `${track.trackId || track.collectionId || track.artistId || "track"}-${track.previewUrl || track.trackName || track.collectionName || "item"}`,
//     title: track.trackName || track.collectionName || "Untitled track",
//     artist: track.artistName || "Unknown artist",
//     album: track.collectionName || "Single",
//     artwork:
//       track.artworkUrl100?.replace("100x100", "600x600") ||
//       track.artworkUrl60 ||
//       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
//     audioUrl,
//     previewUrl: track.previewUrl || "",
//     genre: track.primaryGenreName || "Mixed",
//     year: track.releaseDate ? new Date(track.releaseDate).getFullYear() : "",
//     durationLabel: toDurationLabel(track.trackTimeMillis),
//     releaseDate: track.releaseDate || "",
//     sourceLabel: "iTunes",
//   };
// }

// function normalizeArtist(name, tracks = [], context = null, artistMeta = null) {
//   return {
//     id: `${name}-${artistMeta?.artistId || tracks[0]?.id || "artist"}`,
//     name,
//     image:
//       tracks[0]?.artwork ||
//       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
//     tracks,
//     trackCount: tracks.length,
//     country: context?.country || "",
//     tagline: context?.tags?.[0] || tracks[0]?.genre || "Artist preview",
//     primaryGenre:
//       artistMeta?.primaryGenreName ||
//       tracks[0]?.genre ||
//       "Mixed",
//   };
// }

// async function safeFetchJson(url, options = {}) {
//   const response = await fetch(url, options);

//   if (!response.ok) {
//     throw new Error(`Request failed with status ${response.status}`);
//   }

//   return response.json();
// }

// export async function searchTracks(query, limit = 12) {
//   if (!query?.trim()) {
//     return [];
//   }

//   const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(
//     query
//   )}&entity=song&limit=${limit}`;

//   const data = await safeFetchJson(url);

//   return (data.results || [])
//     .filter((track) => track.previewUrl)
//     .map(normalizeTrack);
// }

// async function searchArtistsDirect(query, limit = 8) {
//   if (!query?.trim()) {
//     return [];
//   }

//   const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(
//     query
//   )}&entity=musicArtist&limit=${limit}`;

//   const data = await safeFetchJson(url);
//   return data.results || [];
// }

// export async function searchArtists(query, limit = 8) {
//   if (!query?.trim()) {
//     return [];
//   }

//   try {
//     const directArtists = await searchArtistsDirect(query, limit);

//     if (directArtists.length) {
//       const artists = await Promise.all(
//         directArtists.slice(0, limit).map(async (artist) => {
//           const name = artist.artistName;
//           const [tracks, context] = await Promise.all([
//             getArtistTopTracks(name),
//             getArtistContext(name),
//           ]);

//           return normalizeArtist(name, tracks.slice(0, 5), context, artist);
//         })
//       );

//       return artists.filter((artist) => artist.name);
//     }
//   } catch {
//     // Fallback to track-derived artist search below.
//   }

//   const tracks = await searchTracks(query, limit * 3);
//   const names = [...new Set(tracks.map((track) => track.artist))].slice(0, limit);

//   const artists = await Promise.all(
//     names.map(async (name) => {
//       const artistTracks = tracks.filter((track) => track.artist === name).slice(0, 5);
//       const context = await getArtistContext(name);
//       return normalizeArtist(name, artistTracks, context);
//     })
//   );

//   return artists.filter((artist) => artist.name);
// }

// export async function getArtistTopTracks(artistName) {
//   if (!artistName?.trim()) {
//     return [];
//   }

//   const tracks = await searchTracks(artistName, 20);
//   const normalizedArtistName = artistName.toLowerCase().trim();

//   const exactMatches = tracks.filter(
//     (track) => track.artist.toLowerCase().trim() === normalizedArtistName
//   );

//   if (exactMatches.length) {
//     return exactMatches.slice(0, 10);
//   }

//   return tracks
//     .filter((track) =>
//       track.artist.toLowerCase().includes(normalizedArtistName)
//     )
//     .slice(0, 10);
// }

// export async function getArtistContext(artistName) {
//   if (!artistName?.trim()) {
//     return null;
//   }

//   try {
//     const url = `${MUSIC_BRAINZ_BASE_URL}/artist?query=${encodeURIComponent(
//       `artist:${artistName}`
//     )}&fmt=json&limit=1`;

//     const data = await safeFetchJson(url, {
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     const artist = data.artists?.[0];

//     if (!artist) {
//       return null;
//     }

//     const tags = (artist.tags || []).slice(0, 5).map((tag) => tag.name);

//     return {
//       country: artist.country || "",
//       tags,
//       summary: tags.length
//         ? `${artistName} surfaces through ${tags.join(", ")} with a cross-market listening profile.`
//         : `${artistName} is available here with preview tracks and radio-style exploration.`,
//     };
//   } catch {
//     return null;
//   }
// }

// export async function getFeaturedArtists() {
//   const artists = await Promise.all(
//     featuredArtistNames.map(async (name) => {
//       const [tracks, context] = await Promise.all([
//         getArtistTopTracks(name),
//         getArtistContext(name),
//       ]);

//       return normalizeArtist(name, tracks.slice(0, 4), context);
//     })
//   );

//   return artists.filter((artist) => artist.name);
// }

// export async function getTrendingTracks() {
//   const resultSets = await Promise.all(homeQueries.map((query) => searchTracks(query, 6)));
//   return resultSets.flat().slice(0, 12);
// }

// export async function getRadioStations({ query = "", limit = 6 } = {}) {
//   const path = query?.trim()
//     ? `${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}&limit=${limit}`
//     : `${RADIO_BROWSER_BASE_URL}/stations/topclick/${limit}`;

//   const data = await safeFetchJson(path, {
//     headers: {
//       Accept: "application/json",
//     },
//   });

//   return (data || [])
//     .filter((station) => station.url_resolved || station.url)
//     .map((station) => ({
//       id: station.stationuuid,
//       title: station.name,
//       artist: station.country || "Live radio",
//       album: station.language || "Radio",
//       artwork:
//         "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=900&q=80",
//       audioUrl: station.url_resolved || station.url,
//       previewUrl: "",
//       streamUrl: station.url_resolved || station.url,
//       genre: station.tags || "Radio",
//       year: "",
//       durationLabel: "Live",
//       sourceLabel: "Radio Browser",
//     }));
// }

// export async function getHomeStations() {
//   return getRadioStations({ query: "chill", limit: 4 });
// }

// function dedupeJourneyTracks(tracks) {
//   const seen = new Set();

//   return tracks.filter((track) => {
//     if (!track?.id || seen.has(track.id)) {
//       return false;
//     }

//     seen.add(track.id);
//     return true;
//   });
// }

// export async function buildBlendJourney({ fromArtist, toArtist, mood }) {
//   const [originTracks, destinationTracks, originContext, destinationContext] = await Promise.all([
//     searchTracks(fromArtist || mood, 8),
//     searchTracks(toArtist || mood, 8),
//     getArtistContext(fromArtist),
//     getArtistContext(toArtist),
//   ]);

//   const bridgeQuery =
//     originContext?.tags?.find((tag) => destinationContext?.tags?.includes(tag)) ||
//     mood ||
//     "global fusion";

//   const bridgeTracks = await searchTracks(bridgeQuery, 6);

//   const tracks = dedupeJourneyTracks([
//     ...originTracks.slice(0, 3),
//     ...bridgeTracks.slice(0, 3),
//     ...destinationTracks.slice(0, 4),
//   ]);

//   return {
//     id: `journey-${Date.now()}`,
//     title: `${fromArtist || mood} to ${toArtist || mood}`,
//     summary: `Starts with ${fromArtist || mood}, threads through ${
//       bridgeQuery || "a matching connective sound"
//     }, and lands on ${toArtist || mood}.`,
//     bridgeLabel: bridgeQuery,
//     tracks,
//     stages: [
//       `Launch with ${fromArtist || mood}`,
//       `Bridge using ${bridgeQuery}`,
//       `Land on ${toArtist || mood}`,
//     ],
//   };
// }


const ITUNES_BASE_URL = "https://itunes.apple.com";
const MUSIC_BRAINZ_BASE_URL = "https://musicbrainz.org/ws/2";
const RADIO_BROWSER_BASE_URL = "https://de1.api.radio-browser.info/json";

const featuredArtistNames = [
  "Arijit Singh",
  "The Weeknd",
  "Shreya Ghoshal",
  "Taylor Swift",
  "Anirudh Ravichander",
  "Billie Eilish",
  "AP Dhillon",
  "Dua Lipa",
];

const homeQueries = ["global hits", "indie chill", "bollywood love", "afrobeats", "night drive"];

function toDurationLabel(durationMs) {
  if (!durationMs) return "Preview";
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = `${totalSeconds % 60}`.padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function normalizeTrack(track) {
  const audioUrl = track.fullTrackUrl || track.previewUrl || "";

  return {
    id: `${track.trackId || track.collectionId || track.artistId || "track"}-${track.previewUrl || track.trackName || track.collectionName || "item"}`,
    title: track.trackName || track.collectionName || "Untitled track",
    artist: track.artistName || "Unknown artist",
    album: track.collectionName || "Single",
    artwork:
      track.artworkUrl100?.replace("100x100", "600x600") ||
      track.artworkUrl60 ||
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    audioUrl,
    previewUrl: track.previewUrl || "",
    genre: track.primaryGenreName || "Mixed",
    year: track.releaseDate ? new Date(track.releaseDate).getFullYear() : "",
    durationLabel: toDurationLabel(track.trackTimeMillis),
    releaseDate: track.releaseDate || "",
    sourceLabel: "iTunes",
  };
}

function normalizeArtist(name, tracks = [], context = null, artistMeta = null) {
  return {
    id: `${name}-${artistMeta?.artistId || tracks[0]?.id || "artist"}`,
    name,
    image:
      tracks[0]?.artwork ||
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    tracks,
    trackCount: tracks.length,
    country: context?.country || "",
    tagline: context?.tags?.[0] || tracks[0]?.genre || "Artist preview",
    primaryGenre: artistMeta?.primaryGenreName || tracks[0]?.genre || "Mixed",
  };
}

function createJourneyPlaceholderTrack(label, genre = "Mixed") {
  return {
    id: `placeholder-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: label,
    artist: "Unavailable right now",
    album: "Journey placeholder",
    artwork:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    audioUrl: "",
    previewUrl: "",
    genre,
    year: "",
    durationLabel: "Preview unavailable",
    releaseDate: "",
    sourceLabel: "Fallback",
  };
}

async function safeFetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

async function safeFetchList(getter) {
  try {
    const result = await getter();
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

async function safeFetchValue(getter, fallback = null) {
  try {
    return await getter();
  } catch {
    return fallback;
  }
}

export async function searchTracks(query, limit = 12) {
  if (!query?.trim()) return [];

  const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(query)}&entity=song&limit=${limit}`;
  const data = await safeFetchJson(url);

  return (data.results || [])
    .filter((track) => track.previewUrl)
    .map(normalizeTrack);
}

async function searchArtistsDirect(query, limit = 8) {
  if (!query?.trim()) return [];

  const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(query)}&entity=musicArtist&limit=${limit}`;
  const data = await safeFetchJson(url);
  return data.results || [];
}

export async function searchArtists(query, limit = 8) {
  if (!query?.trim()) return [];

  const directArtists = await safeFetchList(() => searchArtistsDirect(query, limit));

  if (directArtists.length) {
    const artists = await Promise.all(
      directArtists.slice(0, limit).map(async (artist) => {
        const name = artist.artistName;
        const [tracks, context] = await Promise.all([
          safeFetchList(() => getArtistTopTracks(name)),
          safeFetchValue(() => getArtistContext(name), null),
        ]);

        return normalizeArtist(name, tracks.slice(0, 5), context, artist);
      })
    );

    return artists.filter((artist) => artist.name);
  }

  const tracks = await safeFetchList(() => searchTracks(query, limit * 3));
  const names = [...new Set(tracks.map((track) => track.artist))].slice(0, limit);

  const artists = await Promise.all(
    names.map(async (name) => {
      const artistTracks = tracks.filter((track) => track.artist === name).slice(0, 5);
      const context = await safeFetchValue(() => getArtistContext(name), null);
      return normalizeArtist(name, artistTracks, context);
    })
  );

  return artists.filter((artist) => artist.name);
}

export async function getArtistTopTracks(artistName) {
  if (!artistName?.trim()) return [];

  const tracks = await safeFetchList(() => searchTracks(artistName, 20));
  const normalizedArtistName = artistName.toLowerCase().trim();

  const exactMatches = tracks.filter(
    (track) => track.artist.toLowerCase().trim() === normalizedArtistName
  );

  if (exactMatches.length) {
    return exactMatches.slice(0, 10);
  }

  return tracks
    .filter((track) => track.artist.toLowerCase().includes(normalizedArtistName))
    .slice(0, 10);
}

export async function getArtistContext(artistName) {
  if (!artistName?.trim()) return null;

  try {
    const url = `${MUSIC_BRAINZ_BASE_URL}/artist?query=${encodeURIComponent(
      `artist:${artistName}`
    )}&fmt=json&limit=1`;

    const data = await safeFetchJson(url, {
      headers: {
        Accept: "application/json",
      },
    });

    const artist = data.artists?.[0];
    if (!artist) return null;

    const tags = (artist.tags || []).slice(0, 5).map((tag) => tag.name);

    return {
      country: artist.country || "",
      tags,
      summary: tags.length
        ? `${artistName} surfaces through ${tags.join(", ")} with a cross-market listening profile.`
        : `${artistName} is available here with preview tracks and radio-style exploration.`,
    };
  } catch {
    return null;
  }
}

export async function getFeaturedArtists() {
  const artists = await Promise.all(
    featuredArtistNames.map(async (name) => {
      const [tracks, context] = await Promise.all([
        safeFetchList(() => getArtistTopTracks(name)),
        safeFetchValue(() => getArtistContext(name), null),
      ]);

      return normalizeArtist(name, tracks.slice(0, 4), context);
    })
  );

  return artists.filter((artist) => artist.name);
}

export async function getTrendingTracks() {
  const resultSets = await Promise.all(
    homeQueries.map((query) => safeFetchList(() => searchTracks(query, 6)))
  );

  return resultSets.flat().slice(0, 12);
}

export async function getRadioStations({ query = "", limit = 6 } = {}) {
  const path = query?.trim()
    ? `${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}&limit=${limit}`
    : `${RADIO_BROWSER_BASE_URL}/stations/topclick/${limit}`;

  const data = await safeFetchJson(path, {
    headers: {
      Accept: "application/json",
    },
  });

  return (data || [])
    .filter((station) => station.url_resolved || station.url)
    .map((station) => ({
      id: station.stationuuid,
      title: station.name,
      artist: station.country || "Live radio",
      album: station.language || "Radio",
      artwork:
        "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=900&q=80",
      audioUrl: station.url_resolved || station.url,
      previewUrl: "",
      streamUrl: station.url_resolved || station.url,
      genre: station.tags || "Radio",
      year: "",
      durationLabel: "Live",
      sourceLabel: "Radio Browser",
    }));
}

export async function getHomeStations() {
  return safeFetchList(() => getRadioStations({ query: "chill", limit: 4 }));
}

function dedupeJourneyTracks(tracks) {
  const seen = new Set();

  return tracks.filter((track) => {
    if (!track?.id || seen.has(track.id)) return false;
    seen.add(track.id);
    return true;
  });
}

export async function buildBlendJourney({ fromArtist, toArtist, mood }) {
  const fromSeed = fromArtist || mood || "Origin";
  const toSeed = toArtist || mood || "Destination";

  const [originTracks, destinationTracks, originContext, destinationContext] = await Promise.all([
    safeFetchList(() => searchTracks(fromSeed, 8)),
    safeFetchList(() => searchTracks(toSeed, 8)),
    fromArtist ? safeFetchValue(() => getArtistContext(fromArtist), null) : Promise.resolve(null),
    toArtist ? safeFetchValue(() => getArtistContext(toArtist), null) : Promise.resolve(null),
  ]);

  const bridgeQuery =
    originContext?.tags?.find((tag) => destinationContext?.tags?.includes(tag)) ||
    mood ||
    "global fusion";

  const bridgeTracks = await safeFetchList(() => searchTracks(bridgeQuery, 6));

  let tracks = dedupeJourneyTracks([
    ...originTracks.slice(0, 3),
    ...bridgeTracks.slice(0, 3),
    ...destinationTracks.slice(0, 4),
  ]);

  if (!tracks.length) {
    tracks = [
      createJourneyPlaceholderTrack(`Start with ${fromSeed}`),
      createJourneyPlaceholderTrack(`Bridge through ${bridgeQuery}`),
      createJourneyPlaceholderTrack(`Arrive at ${toSeed}`),
    ];
  }

  return {
    id: `journey-${Date.now()}`,
    title: `${fromSeed} to ${toSeed}`,
    summary: `Starts with ${fromSeed}, threads through ${bridgeQuery}, and lands on ${toSeed}.`,
    bridgeLabel: bridgeQuery,
    tracks,
    stages: [
      `Launch with ${fromSeed}`,
      `Bridge using ${bridgeQuery}`,
      `Land on ${toSeed}`,
    ],
  };
}