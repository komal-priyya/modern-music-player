



// import { getApp, getApps, initializeApp } from "firebase/app";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInAnonymously,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signInWithRedirect,
//   getRedirectResult,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

// export const firebaseApp = isFirebaseConfigured
//   ? getApps().length
//     ? getApp()
//     : initializeApp(firebaseConfig)
//   : null;

// export const auth = firebaseApp ? getAuth(firebaseApp) : null;
// export const db = firebaseApp ? getFirestore(firebaseApp) : null;

// const googleProvider = auth ? new GoogleAuthProvider() : null;

// export async function handleGoogleRedirect() {
//   if (!auth) return null;
//   const result = await getRedirectResult(auth);
//   return result?.user ?? null;
// }

// // export async function ensureFirebaseUser() {
// //   if (!auth) return null;
// //   if (auth.currentUser) return auth.currentUser;
// //   const credential = await signInAnonymously(auth);
// //   return credential.user;
// // }



// export async function ensureFirebaseUser() {
//   if (!auth) return null;

//   // Wait for Firebase to restore the session before checking currentUser
//   return new Promise((resolve) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       unsubscribe();
//       if (user) {
//         resolve(user);
//       } else {
//         // No real user — sign in anonymously
//         signInAnonymously(auth)
//           .then((credential) => resolve(credential.user))
//           .catch(() => resolve(null));
//       }
//     });
//   });
// }

// export function watchAuthUser(callback) {
//   if (!auth) {
//     callback(null);
//     return () => {};
//   }
//   return onAuthStateChanged(auth, callback);
// }

// export async function loginWithGoogle() {
//   if (!auth || !googleProvider) {
//     throw new Error("Firebase is not configured");
//   }
//   await signInWithRedirect(auth, googleProvider);
// }

// export async function loginWithEmail(email, password) {
//   if (!auth) throw new Error("Firebase is not configured");
//   const result = await signInWithEmailAndPassword(auth, email, password);
//   return result.user;
// }

// export async function registerWithEmail(name, email, password) {
//   if (!auth) throw new Error("Firebase is not configured");
//   const result = await createUserWithEmailAndPassword(auth, email, password);
//   if (name?.trim()) {
//     await updateProfile(result.user, { displayName: name.trim() });
//   }
//   return result.user;
// }

// export async function logoutUser() {
//   if (!auth) return;
//   await signOut(auth);
// }



// // import { getApp, getApps, initializeApp } from "firebase/app";
// // import {
// //   createUserWithEmailAndPassword,
// //   getAuth,
// //   GoogleAuthProvider,
// //   onAuthStateChanged,
// //   signInAnonymously,
// //   signInWithEmailAndPassword,
// //   signInWithPopup,
// //   signOut,
// //   updateProfile,
// // } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";

// // const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// // };

// // export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

// // export const firebaseApp = isFirebaseConfigured
// //   ? getApps().length
// //     ? getApp()
// //     : initializeApp(firebaseConfig)
// //   : null;

// // export const auth = firebaseApp ? getAuth(firebaseApp) : null;
// // export const db = firebaseApp ? getFirestore(firebaseApp) : null;

// // const googleProvider = auth ? new GoogleAuthProvider() : null;

// // export async function ensureFirebaseUser() {
// //   if (!auth) return null;
// //   if (auth.currentUser) return auth.currentUser;
// //   const credential = await signInAnonymously(auth);
// //   return credential.user;
// // }

// // export function watchAuthUser(callback) {
// //   if (!auth) {
// //     callback(null);
// //     return () => {};
// //   }
// //   return onAuthStateChanged(auth, callback);
// // }

// // export async function loginWithGoogle() {
// //   if (!auth || !googleProvider) {
// //     throw new Error("Firebase is not configured");
// //   }
// //   const result = await signInWithPopup(auth, googleProvider);
// //   return result.user;
// // }

// // export async function loginWithEmail(email, password) {
// //   if (!auth) throw new Error("Firebase is not configured");
// //   const result = await signInWithEmailAndPassword(auth, email, password);
// //   return result.user;
// // }

// // export async function registerWithEmail(name, email, password) {
// //   if (!auth) throw new Error("Firebase is not configured");
// //   const result = await createUserWithEmailAndPassword(auth, email, password);
// //   if (name?.trim()) {
// //     await updateProfile(result.user, { displayName: name.trim() });
// //   }
// //   return result.user;
// // }

// // export async function logoutUser() {
// //   if (!auth) return;
// //   await signOut(auth);
// // }



// // import { initializeApp } from "firebase/app";
// // import {
// //   getAuth,
// //   onAuthStateChanged,
// //   signInWithEmailAndPassword,
// //   createUserWithEmailAndPassword,
// //   signOut,
// //   updateProfile,
// //   sendEmailVerification,
// //   reload,
// // } from "firebase/auth";

// // const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// // };


// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);

// // export { auth };

// // export function watchAuthUser(callback) {
// //   return onAuthStateChanged(auth, callback);
// // }

// // export async function loginWithEmail(email, password) {
// //   return await signInWithEmailAndPassword(auth, email, password);
// // }

// // export async function registerWithEmail(name, email, password) {
// //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);

// //   if (name) {
// //     await updateProfile(userCredential.user, {
// //       displayName: name,
// //     });
// //   }

// //   await sendEmailVerification(userCredential.user);

// //   return userCredential;
// // }

// // export async function logoutUser() {
// //   return await signOut(auth);
// // }

// // export async function resendVerificationEmail() {
// //   if (!auth.currentUser) {
// //     throw new Error("No signed-in user found.");
// //   }

// //   await sendEmailVerification(auth.currentUser);
// // }

// // export async function refreshCurrentUser() {
// //   if (!auth.currentUser) {
// //     return null;
// //   }

// //   await reload(auth.currentUser);
// //   return auth.currentUser;
// // }





import { getApp, getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

export const firebaseApp = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;

const googleProvider = auth ? new GoogleAuthProvider() : null;

export async function handleGoogleRedirect() {
  if (!auth) return null;
  const result = await getRedirectResult(auth);
  return result?.user ?? null;
}

export function waitForAuthReady() {
  return new Promise((resolve) => {
    if (!auth) return resolve(null);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export function watchAuthUser(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function loginWithGoogle() {
  if (!auth || !googleProvider) throw new Error("Firebase is not configured");
  await signInWithRedirect(auth, googleProvider);
}

export async function loginWithEmail(email, password) {
  if (!auth) throw new Error("Firebase is not configured");
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function registerWithEmail(name, email, password) {
  if (!auth) throw new Error("Firebase is not configured");
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (name?.trim()) {
    await updateProfile(result.user, { displayName: name.trim() });
  }
  return result.user;
}

export async function logoutUser() {
  if (!auth) return;
  await signOut(auth);
}