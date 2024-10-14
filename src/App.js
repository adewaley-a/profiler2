
import './App.css';
import React from 'react';
import ProfilerLogin from './profilerlogin';
import ProfilerPage from './profilerpage';
import Profilerpage1 from './profilerpage1';
import Display from './display';
import {Route, Routes, BrowserRouter} from "react-router-dom"


function App() {
 
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