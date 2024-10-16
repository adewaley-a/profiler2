import {auth, googleProvider} from "./firebase"
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged } from "firebase/auth"
import useAuthState from "react-firebase-hooks/auth"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import React, { useContext } from 'react';
import { VisibilityContext } from './VisibilityContext'; 

function ProfilerLogin(){
    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [user, setUser]= useState(null)
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
       
        catch(err){console.error(err)}

        
    }
   

    return(
        <div>
            <input 
            type="email"
            placeholder="Email"
            onChange= {(e)=> setEmail(e.target.value)}
            ></input>
            <input
            type="password"
            placeholder="Password"
            onChange= {(e)=> setPassword(e.target.value)}
            ></input>
            <button onClick={() => { signIn(); toggleVisibility(); }} >Sign up</button>

            <h3>GAP</h3>

            <input 
            type="email"
            placeholder="Email"
            onChange= {(e)=> setEmail(e.target.value)}
            ></input>
            <input
            type="password"
            placeholder="Password"
            onChange= {(e)=> setPassword(e.target.value)}
            ></input>
            <button onClick={() => { logIn(); toggleVisibility(); }} >Login</button>
        </div>
    )
}
export default ProfilerLogin