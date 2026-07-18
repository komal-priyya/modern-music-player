



function getStorageKey(userId) {
  return userId ? `muzify-library-v2-${userId}` : "muzify-library-guest";
}

export const defaultLibraryState = {
  liked: [],
  history: [],
  journeys: [],
  playlists: [
    {
      id: "quick-capture",
      name: "Quick Capture",
      tracks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

function mergeWithDefaults(rawState) {
  return {
    ...defaultLibraryState,
    ...rawState,
    playlists:
      rawState?.playlists?.length > 0
        ? rawState.playlists
        : defaultLibraryState.playlists,
  };
}

// function readLocalState(userId) {
//   try {
//     const raw = window.localStorage.getItem(getStorageKey(userId));
//     return raw ? mergeWithDefaults(JSON.parse(raw)) : defaultLibraryState;
//   } catch {
//     return defaultLibraryState;
//   }
// }

function readLocalState(userId) {
  try {
    const key = getStorageKey(userId);
    const raw = window.localStorage.getItem(key);
    console.log("READ KEY:", key, "RAW:", raw);
    return raw ? mergeWithDefaults(JSON.parse(raw)) : defaultLibraryState;
  } catch {
    return defaultLibraryState;
  }
}









function writeLocalState(userId, state) {
  window.localStorage.setItem(getStorageKey(userId), JSON.stringify(state));
}

export async function loadPersistedLibrary(user) {
  const state = readLocalState(user?.uid);
  return { state, cloudSync: false };
}






export async function savePersistedLibrary(state, user) {
    console.log("SAVING TO KEY:", getStorageKey(user?.uid), "LIKED:", state.liked.length);

  writeLocalState(user?.uid, state);
  return false;
}