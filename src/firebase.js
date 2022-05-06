import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace with your app's Firebase project configuration
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAlf-QV2bLt26S1DKtJ5MpydYgVbva3Shw",
  authDomain: "beu-mvp.firebaseapp.com",
  databaseURL: "https://beu-mvp-default-rtdb.firebaseio.com",
  projectId: "beu-mvp",
  storageBucket: "beu-mvp.appspot.com",
  messagingSenderId: "420689450815",
  appId: "1:420689450815:web:63e89c8a6595442f2a658a",
  measurementId: "G-X3GNHFPHXD",
};

const fb = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(fb);

export { fb, db };
