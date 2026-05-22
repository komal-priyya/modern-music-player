

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