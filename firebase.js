"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API,
  authDomain: "link-me-52fe8.firebaseapp.com",
  projectId: "link-me-52fe8",
  storageBucket: "link-me-52fe8.appspot.com",
  messagingSenderId: "908535559421",
  appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, provider, firestore };
