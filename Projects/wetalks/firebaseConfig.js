// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ import Firestore

let analytics;

const firebaseConfig = {
  apiKey: "AIzaSyD7vN4HB8H6p7JWE1ruT4SccaI9aa-rFXs",
  authDomain: "wetalks-ca50f.firebaseapp.com",
  projectId: "wetalks-ca50f",
  storageBucket: "wetalks-ca50f.firebasestorage.app",
  messagingSenderId: "810329176793",
  appId: "1:810329176793:web:1f2c54b45214bc5f985cc8",
  measurementId: "G-SGXM6RQWBB",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth instance
const auth = getAuth(app);

// ✅ Firestore instance
const db = getFirestore(app);

// ✅ Initialize Analytics only if running in browser
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export { analytics, app, auth, db }; // ✅ now db is defined
