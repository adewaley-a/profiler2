import {auth, googleProvider} from "./firebase"
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged } from "firebase/auth"
import useAuthState from "react-firebase-hooks/auth"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import React, { useContext } from 'react';
import { VisibilityContext } from './VisibilityContext'; 
import './profilerlogin.css'
import ptagbot from './profilerbot.png' 

function ProfilerLogin(){
    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [user, setUser]= useState(null)
    const [error, setError] = useState(null)
    const { toggleVisibility } = useContext(VisibilityContext); 

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

    const signIn=async()=>{
       
        try

        { const userCredential = await createUserWithEmailAndPassword(auth, email, password)
           
                const user = userCredential.user
                console.log("User registered with UID:", user.uid)
                navigate(`/user/${user.uid}`)
                return user.uid

        }
       
        catch(err){console.error(err)}
        
    }
 
    const logIn=async()=>{
       
        try

        { const userCredential = await signInWithEmailAndPassword(auth, email, password)
                
                const user = userCredential.user
                console.log("User logged in with UID:", user.uid)
                navigate(`/user/${user.uid}`)
                return user.uid

                
        }
       
        catch(err){console.error(err)
        
          setError(err.message);
        }

        
    }
   

    return(
        <div className="logcover">
          <img src={ptagbot} className='ptagbot' />
          <h3 className="gapes">New account?</h3>
            <input 
            className="sign"
            type="email"
            placeholder="Email"
            onChange= {(e)=> setEmail(e.target.value)}
            ></input>

            <input
            className="pword"
            type="password"
            placeholder="Password"
            onChange= {(e)=> setPassword(e.target.value)}
            ></input>
            <button className="loginaccess" onClick={() => {toggleVisibility();toggleVisibility(); signIn();  }} >Sign up</button>
            

            <h3 className="gape"></h3>
            <h3 className="gape"></h3>
           
            
            <h3 className="gapes">Registered?</h3>
            <input 
            className="log"
            type="email"
            placeholder="Email"
            onChange= {(e)=> setEmail(e.target.value)}
            ></input>

            <input
            className="pword"
            type="password"
            placeholder="Password"
            onChange= {(e)=> setPassword(e.target.value)}
            ></input>
            <button className="loginaccess" onClick={() => {toggleVisibility(); logIn();  }} >Login</button>
            {error && <p className="warning" style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
export default ProfilerLogin