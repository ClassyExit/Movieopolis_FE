import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDocFromCache, getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnVqA82qDb3DnL1Ovx8TLyIu-GkO1vOpo",
  authDomain: "movieopolis-714f2.firebaseapp.com",
  projectId: "movieopolis-714f2",
  storageBucket: "movieopolis-714f2.appspot.com",
  messagingSenderId: "222225768318",
  appId: "1:222225768318:web:f51aba2e4c9223ae89dd2f",
  measurementId: "G-SPK6PP2L1D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Cloud Firestore
const db = getFirestore(app);

export { auth, db };
