// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFTjXwKBXvGB7O2LlH0dofCwLf5A6U-PU",
  authDomain: "payment-app-84e62.firebaseapp.com",
  projectId: "payment-app-84e62",
  storageBucket: "payment-app-84e62.appspot.com",
  messagingSenderId: "822871875110",
  appId: "1:822871875110:web:1f07d5e85f26a143d410e7",
  measurementId: "G-5KKFQMLKF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);