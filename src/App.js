
import './App.css';
import React from 'react';
import ProfilerLogin from './profilerlogin';
import ProfilerPage from './profilerpage';
import Profilerpage1 from './profilerpage1';
import Display from './display';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { db, auth } from './firebase';
import  { useState, useEffect } from 'react';
import { signOut, getAuth, onAuthStateChanged, signInAnonymously} from 'firebase/auth';

function App() {
 
  const [user, setUser]= useState(null)

  useEffect(() => {
    // Check for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // If no user is signed in, sign in anonymously
        signInAnonymously(auth)
          .then((userCredential) => {
            // Signed in successfully
            setUser(userCredential.user);
            console.log("anon ti wole")
          })
          .catch((error) => {
            console.error('Anonymous sign-in failed:', error);
          });
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<ProfilerLogin/>}/>
        <Route path="/user/:uid" element={<ProfilerPage></ProfilerPage>}/>
       
        
      </Routes>
   </div>
  );
}

export default App;