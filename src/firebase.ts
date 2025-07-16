// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "ISI_DARI_FIREBASE",
  authDomain: "ISI.firebaseapp.com",
  projectId: "ISI",
  storageBucket: "ISI.appspot.com",
  messagingSenderId: "ISI",
  appId: "ISI"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
