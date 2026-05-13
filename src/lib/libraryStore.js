// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db, ensureFirebaseUser, isFirebaseConfigured } from "./firebase";
// // import {  ensureFirebaseUser } from "./firebase";

// // const STORAGE_KEY = "muzify-library-v2";

// function getStorageKey(userId) {
//   return userId
//     ? `muzify-library-v2-${userId}`
//     : "muzify-library-guest";
// }

// export const defaultLibraryState = {
//   liked: [],
//   history: [],
//   journeys: [],
//   playlists: [
//     {
//       id: "quick-capture",
//       name: "Quick Capture",
//       tracks: [],
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     },
//   ],
// };

// function mergeWithDefaults(rawState) {
//   return {
//     ...defaultLibraryState,
//     ...rawState,
//     playlists:
//       rawState?.playlists?.length > 0 ? rawState.playlists : defaultLibraryState.playlists,
//   };
// }

// // function readLocalState() {
// //   try {
// //     const raw = window.localStorage.getItem(STORAGE_KEY);
// //     return raw ? mergeWithDefaults(JSON.parse(raw)) : defaultLibraryState;
// //   } catch {
// //     return defaultLibraryState;
// //   }
// // }





// function readLocalState(userId) {
//   try {
//     const raw = window.localStorage.getItem(
//       getStorageKey(userId)
//     );

//     return raw
//       ? mergeWithDefaults(JSON.parse(raw))
//       : defaultLibraryState;
//   } catch {
//     return defaultLibraryState;
//   }
// }





// // function writeLocalState(state) {
// //   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
// // }





// function writeLocalState(userId, state) {
//   window.localStorage.setItem(
//     getStorageKey(userId),
//     JSON.stringify(state)
//   );
// }

// // export async function loadPersistedLibrary() {
// //   const localState = readLocalState();

// //   if (!isFirebaseConfigured || !db) {
// //     return { state: localState, cloudSync: false };
// //   }

// //   try {
// //     const user = await ensureFirebaseUser();
// //     if (!user) {
// //       return { state: localState, cloudSync: false };
// //     }

// //     const snapshot = await getDoc(doc(db, "muzifyUsers", user.uid));
// //     // if (!snapshot.exists()) {
// //     //   return { state: localState, cloudSync: true };
// //     // }
// //     if (!snapshot.exists()) {
// //   await setDoc(doc(db, "muzifyUsers", user.uid), localState);

// //   return {
// //     state: localState,
// //     cloudSync: true,
// //   };
// // }




// export async function loadPersistedLibrary() {
//   // const localState = readLocalState();
//   const user = await ensureFirebaseUser();

// const localState = readLocalState(user?.uid);

//   // FIRST PRIORITY → localStorage
//   if (
//     localState.liked.length > 0 ||
//     localState.playlists.length > 1 ||
//     localState.history.length > 0
//   ) {
//     return {
//       state: localState,
//       cloudSync: false,
//     };
//   }

//   // Firebase fallback
//   if (!isFirebaseConfigured || !db) {
//     return {
//       state: localState,
//       cloudSync: false,
//     };
//   }

//   try {
//     // const user = await ensureFirebaseUser();

//     if (!user) {
//       return {
//         state: localState,
//         cloudSync: false,
//       };
//     }

//     const snapshot = await getDoc(doc(db, "muzifyUsers", user.uid));

//     if (!snapshot.exists()) {
//       await setDoc(doc(db, "muzifyUsers", user.uid), localState);

//       return {
//         state: localState,
//         cloudSync: true,
//       };
//     }

//     const firebaseState = mergeWithDefaults(snapshot.data());

//     // ONLY overwrite localStorage IF local is empty
//     // writeLocalState(firebaseState);
//     writeLocalState(user.uid, firebaseState);

//     return {
//       state: firebaseState,
//       cloudSync: true,
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       state: localState,
//       cloudSync: false,
//     };
//   }
// }
















// //     const state = mergeWithDefaults(snapshot.data());
// //     writeLocalState(state);
// //     return { state, cloudSync: true };
// //   } catch {
// //     return { state: localState, cloudSync: false };
// //   }
// // }

// // export async function savePersistedLibrary(state) {
// //   // writeLocalState(state);
// //   const user = await ensureFirebaseUser();

// // writeLocalState(user?.uid, state);

// //   if (!isFirebaseConfigured || !db) {
// //     return false;
// //   }

// //   try {
// //     const user = await ensureFirebaseUser();
// //     if (!user) {
// //       return false;
// //     }

// //     await setDoc(doc(db, "muzifyUsers", user.uid), state, { merge: true });
// //     return true;
// //   } catch {
// //     return false;
// //   }
// // }
// // export async function savePersistedLibrary(state) {
// //   const user = await ensureFirebaseUser();

// //   writeLocalState(user?.uid, state);

// //   if (!isFirebaseConfigured || !db || !user) {
// //     return false;
// //   }

// //   try {
// //     await setDoc(
// //       doc(db, "muzifyUsers", user.uid),
// //       state,
// //       { merge: true }
// //     );

// //     return true;
// //   } catch {
// //     return false;
// //   }
// // }
// export async function savePersistedLibrary(state) {
//   const user = await ensureFirebaseUser();

//   writeLocalState(user?.uid, state);

//   if (!isFirebaseConfigured || !db || !user) {
//     return false;
//   }

//   try {
//     await setDoc(
//       doc(db, "muzifyUsers", user.uid),
//       state,
//       { merge: true }
//     );

//     return true;
//   } catch {
//     return false;
//   }
// }










import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, ensureFirebaseUser, isFirebaseConfigured } from "./firebase";

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
      rawState?.playlists?.length > 0 ? rawState.playlists : defaultLibraryState.playlists,
  };
}

function readLocalState(userId) {
  try {
    const raw = window.localStorage.getItem(getStorageKey(userId));
    return raw ? mergeWithDefaults(JSON.parse(raw)) : defaultLibraryState;
  } catch {
    return defaultLibraryState;
  }
}

function writeLocalState(userId, state) {
  window.localStorage.setItem(getStorageKey(userId), JSON.stringify(state));
}

// export async function loadPersistedLibrary() {
//   const user = await ensureFirebaseUser();
//   const localState = readLocalState(user?.uid);

//   if (!isFirebaseConfigured || !db) {
//     return { state: localState, cloudSync: false };
//   }

//   if (!user) {
//     return { state: localState, cloudSync: false };
//   }

//   try {
//     const snapshot = await getDoc(doc(db, "muzifyUsers", user.uid));

//     if (!snapshot.exists()) {
//       await setDoc(doc(db, "muzifyUsers", user.uid), localState);
//       return { state: localState, cloudSync: true };
//     }

//     const firebaseState = mergeWithDefaults(snapshot.data());
//     writeLocalState(user.uid, firebaseState);
//     return { state: firebaseState, cloudSync: true };

//   } catch (error) {
//     console.error(error);
//     return { state: localState, cloudSync: false };
//   }
// }

export async function loadPersistedLibrary() {
  const user = await ensureFirebaseUser();
  const localState = readLocalState(user?.uid);

  if (!isFirebaseConfigured || !db || !user) {
    return { state: localState, cloudSync: false };
  }

  try {
    const snapshot = await getDoc(doc(db, "muzifyUsers", user.uid));

    if (!snapshot.exists()) {
      await setDoc(doc(db, "muzifyUsers", user.uid), localState);
      return { state: localState, cloudSync: true };
    }

    const firebaseState = mergeWithDefaults(snapshot.data());

    // Merge firebase with local — take whichever has more data per field
    const mergedState = {
      liked: firebaseState.liked?.length >= localState.liked?.length
        ? firebaseState.liked : localState.liked,
      history: firebaseState.history?.length >= localState.history?.length
        ? firebaseState.history : localState.history,
      journeys: firebaseState.journeys?.length >= localState.journeys?.length
        ? firebaseState.journeys : localState.journeys,
      playlists: firebaseState.playlists?.length >= localState.playlists?.length
        ? firebaseState.playlists : localState.playlists,
    };

    writeLocalState(user.uid, mergedState);
    return { state: mergedState, cloudSync: true };

  } catch (error) {
    console.error(error);
    return { state: localState, cloudSync: false };
  }
}



























export async function savePersistedLibrary(state) {
  const user = await ensureFirebaseUser();

  writeLocalState(user?.uid, state);

  if (!isFirebaseConfigured || !db || !user) {
    return false;
  }

  try {
    await setDoc(doc(db, "muzifyUsers", user.uid), state, { merge: true });
    return true;
  } catch {
    return false;
  }
}
