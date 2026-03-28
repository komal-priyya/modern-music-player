import { searchArtists, searchTracks } from "./musicApi";

const playlistWords = ["playlist", "mix", "songs for", "make me", "create"];
const identifyWords = ["who sings", "which song", "find song", "remember", "lyrics", "line"];

const moodWords = [
  "sad",
  "happy",
  "romantic",
  "chill",
  "party",
  "gym",
  "workout",
  "focus",
  "study",
  "rain",
  "night",
  "late night",
  "calm",
  "energetic",
  "upbeat",
  "lofi",
  "love",
  "melody",
];

const languageWords = ["hindi", "english", "punjabi", "tamil", "telugu", "bollywood"];

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function dedupeTracks(tracks) {
  const seen = new Set();
  return tracks.filter((track) => {
    if (!track?.id || seen.has(track.id)) {
      return false;
    }

    seen.add(track.id);
    return true;
  });
}

function pickWords(text, words) {
  return words.filter((word) => text.includes(word));
}

function extractSearchText(prompt) {
  const trimmed = prompt.trim();
  const quoted = trimmed.match(/"([^"]+)"/);

  if (quoted?.[1]) {
    return quoted[1];
  }

  return trimmed
    .replace(/make me/gi, "")
    .replace(/create/gi, "")
    .replace(/playlist/gi, "")
    .replace(/mix/gi, "")
    .replace(/songs for/gi, "")
    .replace(/who sings/gi, "")
    .replace(/which song/gi, "")
    .replace(/find song/gi, "")
    .replace(/i remember/gi, "")
    .replace(/lyrics/gi, "")
    .replace(/line/gi, "")
    .trim();
}

function buildPlaylistQueries(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const cleanPrompt = extractSearchText(prompt);
  const moods = pickWords(lowerPrompt, moodWords);
  const languages = pickWords(lowerPrompt, languageWords);
  const queries = [];

  if (cleanPrompt) {
    queries.push(cleanPrompt);
  }

  if (moods.length && languages.length) {
    queries.push(`${languages[0]} ${moods[0]}`);
  }

  if (moods.length > 1) {
    queries.push(`${moods[0]} ${moods[1]}`);
  }

  if (languages.length && cleanPrompt && !cleanPrompt.toLowerCase().includes(languages[0])) {
    queries.push(`${cleanPrompt} ${languages[0]}`);
  }

  if (moods.length && cleanPrompt && !cleanPrompt.toLowerCase().includes(moods[0])) {
    queries.push(`${cleanPrompt} ${moods[0]}`);
  }

  if (!queries.length && moods.length) {
    queries.push(moods.join(" "));
  }

  if (!queries.length && languages.length) {
    queries.push(languages.join(" "));
  }

  if (!queries.length) {
    queries.push("global hits");
  }

  return [...new Set(queries)].slice(0, 4);
}

function buildPlaylistName(prompt) {
  const searchText = extractSearchText(prompt);
  if (!searchText) {
    return "Muzify Mix";
  }

  return `${searchText
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")} Mix`;
}

async function buildGeneratedPlaylist(prompt) {
  const queries = buildPlaylistQueries(prompt);
  const resultSets = await Promise.all(queries.map((query) => searchTracks(query, 8)));
  const tracks = dedupeTracks(resultSets.flat()).slice(0, 12);

  return {
    text: tracks.length
      ? `I built a fresh playlist for "${extractSearchText(prompt) || prompt.trim()}".`
      : `I could not build a playlist for "${prompt.trim()}" yet.`,
    tracks,
    intent: "playlist",
    playlistName: buildPlaylistName(prompt),
  };
}

export async function getAssistantReply(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const searchText = extractSearchText(prompt);

  if (!searchText) {
    return {
      text: "Tell me a mood, artist, lyric line, or song idea and I will help.",
      tracks: [],
      intent: "help",
    };
  }

  if (includesAny(lowerPrompt, playlistWords)) {
    return buildGeneratedPlaylist(prompt);
  }

  if (includesAny(lowerPrompt, identifyWords)) {
    const tracks = await searchTracks(searchText, 5);
    return {
      text: tracks.length
        ? "These are the closest song matches I found from your description."
        : `I could not find a strong song match for "${searchText}".`,
      tracks,
      intent: "identify",
    };
  }

  const [tracks, artists] = await Promise.all([
    searchTracks(searchText, 6),
    searchArtists(searchText, 4),
  ]);

  if (tracks.length) {
    return {
      text: `Here are the best matches I found for "${searchText}".`,
      tracks,
      artists,
      intent: "search",
    };
  }

  return {
    text: `I could not find results for "${searchText}". Try an artist name, lyric line, or a mood like "sad night drive playlist".`,
    tracks: [],
    artists: [],
    intent: "empty",
  };
}
