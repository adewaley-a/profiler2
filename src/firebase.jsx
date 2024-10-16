// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASEKEY,
  authDomain: "profiler-backend.firebaseapp.com",
  projectId: "profiler-backend",
  storageBucket: "profiler-backend.appspot.com",
  messagingSenderId: "69683363508",
  appId: "1:69683363508:web:ae8f41dfca50043aefe1e1",
  measurementId: "G-SMJQLFCRJT"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
const analytics = getAnalytics(App);
export const auth = getAuth(App)

export const googleProvider= new GoogleAuthProvider()
const db = getFirestore(App)
export { db }

const getFirestoreData = async () => {
  const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "favorites"));
  querySnapshot.forEach((doc) => console.log(doc.data())); // log each doc
}
