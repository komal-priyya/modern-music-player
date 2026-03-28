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
  if (!durationMs) {
    return "Preview";
  }
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = `${totalSeconds % 60}`.padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function normalizeTrack(track) {
  const audioUrl = track.fullTrackUrl || track.previewUrl || "";

  return {
    id: `${track.trackId || track.collectionId}-${track.previewUrl || track.trackName}`,
    title: track.trackName || track.collectionName || "Untitled track",
    artist: track.artistName || "Unknown artist",
    album: track.collectionName || "Single",
    artwork:
      track.artworkUrl100?.replace("100x100", "600x600") ||
      track.artworkUrl60 ||
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    audioUrl,
    previewUrl: track.previewUrl,
    genre: track.primaryGenreName || "Mixed",
    year: track.releaseDate ? new Date(track.releaseDate).getFullYear() : "",
    durationLabel: toDurationLabel(track.trackTimeMillis),
    releaseDate: track.releaseDate || "",
    sourceLabel: "iTunes",
  };
}

function normalizeArtist(name, tracks, context) {
  return {
    id: `${name}-${tracks[0]?.id || "artist"}`,
    name,
    image:
      tracks[0]?.artwork ||
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    tracks,
    trackCount: tracks.length,
    country: context?.country || "",
    tagline: context?.tags?.[0] || tracks[0]?.genre || "Artist preview",
    primaryGenre: tracks[0]?.genre || "Mixed",
  };
}

async function safeFetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function searchTracks(query, limit = 12) {
  if (!query?.trim()) {
    return [];
  }

  const url = `${ITUNES_BASE_URL}/search?term=${encodeURIComponent(
    query
  )}&entity=song&limit=${limit}`;
  const data = await safeFetchJson(url);
  return (data.results || []).filter((track) => track.previewUrl).map(normalizeTrack);
}

export async function searchArtists(query, limit = 8) {
  const tracks = await searchTracks(query, limit * 2);
  const names = [...new Set(tracks.map((track) => track.artist))].slice(0, limit);
  const artists = await Promise.all(
    names.map(async (name) => {
      const artistTracks = tracks.filter((track) => track.artist === name).slice(0, 5);
      const context = await getArtistContext(name);
      return normalizeArtist(name, artistTracks, context);
    })
  );
  return artists;
}

export async function getArtistTopTracks(artistName) {
  const tracks = await searchTracks(artistName, 14);
  return tracks
    .filter((track) => track.artist.toLowerCase().includes(artistName.toLowerCase()))
    .slice(0, 10);
}

export async function getArtistContext(artistName) {
  if (!artistName) {
    return null;
  }

  try {
    const url = `${MUSIC_BRAINZ_BASE_URL}/artist?query=${encodeURIComponent(
      `artist:${artistName}`
    )}&fmt=json&limit=1`;
    const data = await safeFetchJson(url);
    const artist = data.artists?.[0];
    if (!artist) {
      return null;
    }

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
      const [tracks, context] = await Promise.all([searchTracks(name, 6), getArtistContext(name)]);
      return normalizeArtist(name, tracks.slice(0, 4), context);
    })
  );

  return artists.filter((artist) => artist.tracks.length);
}

export async function getTrendingTracks() {
  const resultSets = await Promise.all(homeQueries.map((query) => searchTracks(query, 6)));
  return resultSets.flat().slice(0, 12);
}

export async function getRadioStations({ query = "", limit = 6 } = {}) {
  const path = query?.trim()
    ? `${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}&limit=${limit}`
    : `${RADIO_BROWSER_BASE_URL}/stations/topclick/${limit}`;
  const data = await safeFetchJson(path);

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
  return getRadioStations({ query: "chill", limit: 4 });
}

function dedupeJourneyTracks(tracks) {
  const seen = new Set();
  return tracks.filter((track) => {
    if (!track?.id || seen.has(track.id)) {
      return false;
    }
    seen.add(track.id);
    return true;
  });
}

export async function buildBlendJourney({ fromArtist, toArtist, mood }) {
  const [originTracks, destinationTracks, originContext, destinationContext] = await Promise.all([
    searchTracks(fromArtist || mood, 8),
    searchTracks(toArtist || mood, 8),
    getArtistContext(fromArtist),
    getArtistContext(toArtist),
  ]);

  const bridgeQuery =
    originContext?.tags?.find((tag) => destinationContext?.tags?.includes(tag)) ||
    mood ||
    "global fusion";
  const bridgeTracks = await searchTracks(bridgeQuery, 6);

  const tracks = dedupeJourneyTracks([
    ...originTracks.slice(0, 3),
    ...bridgeTracks.slice(0, 3),
    ...destinationTracks.slice(0, 4),
  ]);

  return {
    id: `journey-${Date.now()}`,
    title: `${fromArtist || mood} to ${toArtist || mood}`,
    summary: `Starts with ${fromArtist || mood}, threads through ${
      bridgeQuery || "a matching connective sound"
    }, and lands on ${toArtist || mood}.`,
    bridgeLabel: bridgeQuery,
    tracks,
    stages: [
      `Launch with ${fromArtist || mood}`,
      `Bridge using ${bridgeQuery}`,
      `Land on ${toArtist || mood}`,
    ],
  };
}
