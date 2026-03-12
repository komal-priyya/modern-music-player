// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeyCLFexQnY4uX0yNSX2Dxv8ESPKFakis",
  authDomain: "muzify-1f1c2.firebaseapp.com",
  projectId: "muzify-1f1c2",
  storageBucket: "muzify-1f1c2.firebasestorage.app",
  messagingSenderId: "907694282292",
  appId: "1:907694282292:web:42fa74a45daa96b8481c61",
  measurementId: "G-98D5D2CMQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);