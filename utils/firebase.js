import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "creative-minds-ca627.firebaseapp.com",
  projectId: "creative-minds-ca627",
  storageBucket: "creative-minds-ca627.appspot.com",
  messagingSenderId: "523548726141",
  appId: process.env.NEXT_PUBLIC_API_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
