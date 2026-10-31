import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCC5H7aj7EuBoPiALsH4UQ_7aB7rComVNw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "morning-glory-school-d3d6a.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "morning-glory-school-d3d6a",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "morning-glory-school-d3d6a.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1048969240585",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1048969240585:web:cf992a5e867c7d4a5f58d8",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-MT4YRY5F3R",
};

// Initialize Firebase safely without throwing if already initialized
let app: FirebaseApp;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    if (typeof window !== "undefined") {
      auth = getAuth(app);
      db = getFirestore(app);
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } else {
    // Standby fallback if env vars missing
    app = getApps().length ? getApp() : initializeApp({
      apiKey: "AIzaSyDummyKeyForArchitecturePreparation",
      authDomain: "morning-glory-school.firebaseapp.com",
      projectId: "morning-glory-school",
      storageBucket: "morning-glory-school.appspot.com",
      messagingSenderId: "123456789012",
      appId: "1:123456789012:web:abcdef1234567890",
    });
  }
} catch (error) {
  console.info("Firebase client initialized:", error);
}

export { app, auth, db, analytics };

/**
 * Helper to check if Firebase is connected with live production credentials
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("Dummy")
  );
}
