/* eslint-disable no-unused-vars */
import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInAnonymously, 
  onAuthStateChanged 
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import React from 'react';
import { VisibilityContext } from './VisibilityContext'; 
import './profilerlogin.scss';
import ptagbot from './profilerbot.png'; 

function ProfilerLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { toggleVisibility, resetVisibility } = useContext(VisibilityContext); 
    const [loadingsign, setLoadingsign] = useState(false);
    const [loadinglog, setLoadinglog] = useState(false);

    useEffect(() => {
        resetVisibility();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          } else {
            signInAnonymously(auth)
              .then((userCredential) => {
                setUser(userCredential.user);
              })
              .catch((err) => {
                console.error('Anonymous sign-in failed:', err);
              });
          }
        });
    
        return () => unsubscribe();
    }, [resetVisibility]);

    const signIn = async () => {
        setLoadingsign(true);
        try { 
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            navigate(`/user/${newUser.uid}`);
            return newUser.uid;
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoadingsign(false);
        }
    };
 
    const logIn = async () => {
        setLoadinglog(true);
        try { 
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedUser = userCredential.user;
            navigate(`/user/${loggedUser.uid}`);
            return loggedUser.uid;
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoadinglog(false);
        }
    };

    const circles = Array.from({ length: 100 }, (_, i) => i + 1);

    return (
      <div className="bodyl">
        {circles.map((_, index) => (
          <div key={index} className="circle-container">
            <div className="circle"></div>
          </div>
        ))}

        <div className="botcover"> <img src={ptagbot} className='ptagbot' alt="bot" /> </div>
        <div className="logcover">
          <h3 className="gapes">New account?</h3>
            <input 
              className="sign"
              type="email"
              placeholder="randomuser@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="pword"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginaccess" onClick={() => { toggleVisibility(); signIn(); }} >Sign up</button>
            {loadingsign ? <p className="processing">processing...</p> : <p></p>}

            <h3 className="gapes">Registered?</h3>
            <input 
              className="log"
              type="email"
              placeholder="randomuser@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="pword"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginaccess" onClick={() => { toggleVisibility(); logIn(); }} >Login</button>
            {loadinglog ? <p className="processing">processing...</p> : <p></p>}
            {error && <p className="warning" style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>  
    );
}

export default ProfilerLogin;