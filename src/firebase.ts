import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

// BUG FIX: Read config from environment variables — never hard-code keys in source files
const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// BUG FIX: Always pass "(default)" unless you explicitly created a named database.
// If you created a custom database ID in Firebase console, replace "(default)" with it.
export const db = getFirestore(app, "(default)");

// Export Auth
export const auth = getAuth(app);

// Export Firestore utilities
export {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
};
