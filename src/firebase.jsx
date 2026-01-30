// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: "profiler-backend.firebaseapp.com",
  projectId: "profiler-backend",
  storageBucket: "profiler-backend.appspot.com",
  messagingSenderId: "69683363508",
  appId: "1:69683363508:web:ae8f41dfca50043aefe1e1",
  measurementId: "G-SMJQLFCRJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export { db };

export const getFirestoreData = async () => {
  if (!auth.currentUser) return;
  const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "favorites"));
  querySnapshot.forEach((doc) => console.log(doc.data())); 
};