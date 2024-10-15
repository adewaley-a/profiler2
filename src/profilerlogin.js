import {auth, googleProvider} from "./firebase"
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth"
import useAuthState from "react-firebase-hooks/auth"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function ProfilerLogin(){
    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
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
            <button onClick={signIn} >Sign up</button>

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
            <button onClick={logIn} >Login</button>
        </div>
    )
}
export default ProfilerLogin