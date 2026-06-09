import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIfvgfQ2zzIWMefopDu7WhVrD4KhFb1s8",
  authDomain: "tifa-app-da69e.firebaseapp.com",
  projectId: "tifa-app-da69e",
  storageBucket: "tifa-app-da69e.firebasestorage.app",
  messagingSenderId: "990454725751",
  appId: "1:990454725751:web:59a14fa923df6405cdda72"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);