
/* eslint-disable no-unused-vars */
import './App.css';
import React, { useState, useEffect } from 'react';
import ProfilerLogin from './profilerlogin';
import ProfilerPage from './profilerpage';
import { Route, Routes } from "react-router-dom";
import { auth } from './firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

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