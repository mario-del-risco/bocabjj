import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBVvUI2kAxylNJK1jwCXcGPlwdZieiHSbo",
  authDomain: "bocabjj-9900e.firebaseapp.com",
  databaseURL: "https://bocabjj-9900e-default-rtdb.firebaseio.com",
  projectId: "bocabjj-9900e",
  storageBucket: "bocabjj-9900e.firebasestorage.app",
  messagingSenderId: "676394560727",
  appId: "1:676394560727:web:365e9b74bb2309995b9492",
  measurementId: "G-XHL473P93H",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
