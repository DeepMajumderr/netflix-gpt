// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ51LsBipklz3qXRln3z4S7hp7KdD_IU8",
  authDomain: "netflixgpt-bb609.firebaseapp.com",
  projectId: "netflixgpt-bb609",
  storageBucket: "netflixgpt-bb609.firebasestorage.app",
  messagingSenderId: "117103113586",
  appId: "1:117103113586:web:dfe5e2e5e1f674cf7cd9eb",
  measurementId: "G-PNF1RBCGSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()