import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4CwCsJBSqNVTnGFZ5N2pnBeQzhyTHZNs",
  authDomain: "resumeai-9c2c6.firebaseapp.com",
  projectId: "resumeai-9c2c6",
  storageBucket: "resumeai-9c2c6.firebasestorage.app",
  messagingSenderId: "823925110534",
  appId: "1:823925110534:web:fa4b6c4242358b5d8dd087",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);