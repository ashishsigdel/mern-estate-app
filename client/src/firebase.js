// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5e4d6.firebaseapp.com",
  projectId: "mern-estate-5e4d6",
  storageBucket: "mern-estate-5e4d6.appspot.com",
  messagingSenderId: "738947055456",
  appId: "1:738947055456:web:88d1b9d82f0674af40a805"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);