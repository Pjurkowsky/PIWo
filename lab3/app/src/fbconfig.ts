import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQgXmoxy8pCcGzsYqk8uSjOr0aZDPEMzE",
  authDomain: "piwkoo-mozna.firebaseapp.com",
  projectId: "piwkoo-mozna",
  storageBucket: "piwkoo-mozna.appspot.com",
  messagingSenderId: "402668762334",
  appId: "1:402668762334:web:bc27a89828c0e868fa3e4f",
  measurementId: "G-V80RDNG7NH",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
