// firebaseConfig.js

// Import the functions needed from the Firebase SDKs
// 'firebase/app' contains core functions like initializeApp
// 'firebase/firestore' contains functions for database operations like getFirestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// IMPORTANT: REPLACE THE CONTENTS OF THIS OBJECT with YOUR ACTUAL CONFIG from Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyDgpP8t4K4F2XD_-15hgfYvtiSzYOrPtF4",
  authDomain: "safewatch-app.firebaseapp.com",
  projectId: "safewatch-app",
  storageBucket: "safewatch-app.firebasestorage.app",
  messagingSenderId: "413675855443",
  appId: "1:413675855443:web:cea00d1d7516ac05d030a6"
};

// Initialize Firebase with your unique project configuration
// This creates an instance of your Firebase application
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database service
// This 'db' object is what you'll use to interact with your database
const db = getFirestore(app);

// Export the 'db' instance so other files (like index.tsx) can import and use it
export { db };
