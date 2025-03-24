import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4dEwNs0nDi_zbMaaqhwTU74FMP1EnlSQ",
  authDomain: "fir-project-26ea3.firebaseapp.com",
  projectId: "fir-project-26ea3",
  storageBucket: "fir-project-26ea3.firebasestorage.app",
  messagingSenderId: "612857022207",
  appId: "1:612857022207:web:ea82f4c314cac8ec386eca",
  measurementId: "G-FX0787V20C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const db = getFirestore(app);