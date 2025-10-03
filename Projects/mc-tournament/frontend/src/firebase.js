// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyFc9hnD1ZTNk2V_FsB3dNNvMa_-JQ-iQ",
  authDomain: "mctourn.firebaseapp.com",
  projectId: "mctourn",
  storageBucket: "mctourn.appspot.com",
  messagingSenderId: "392218841853",
  appId: "1:392218841853:web:00a18aca6833c97c31e494",
  measurementId: "G-PYSP2SM4X1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Optional: Enable Analytics only if in browser
let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}
