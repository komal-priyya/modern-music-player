import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, ensureFirebaseUser, isFirebaseConfigured } from "./firebase";

const STORAGE_KEY = "muzify-library-v2";

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
      rawState?.playlists?.length > 0 ? rawState.playlists : defaultLibraryState.playlists,
  };
}

function readLocalState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? mergeWithDefaults(JSON.parse(raw)) : defaultLibraryState;
  } catch {
    return defaultLibraryState;
  }
}

function writeLocalState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function loadPersistedLibrary() {
  const localState = readLocalState();

  if (!isFirebaseConfigured || !db) {
    return { state: localState, cloudSync: false };
  }

  try {
    const user = await ensureFirebaseUser();
    if (!user) {
      return { state: localState, cloudSync: false };
    }

    const snapshot = await getDoc(doc(db, "muzifyUsers", user.uid));
    if (!snapshot.exists()) {
      return { state: localState, cloudSync: true };
    }

    const state = mergeWithDefaults(snapshot.data());
    writeLocalState(state);
    return { state, cloudSync: true };
  } catch {
    return { state: localState, cloudSync: false };
  }
}

export async function savePersistedLibrary(state) {
  writeLocalState(state);

  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const user = await ensureFirebaseUser();
    if (!user) {
      return false;
    }

    await setDoc(doc(db, "muzifyUsers", user.uid), state, { merge: true });
    return true;
  } catch {
    return false;
  }
}
