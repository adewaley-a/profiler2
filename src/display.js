/* eslint-disable jsx-a11y/anchor-is-valid */
import './display.css';
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import bot from './profilerbot.png';
import copy from './copyiconw.png';
import Plink from './plink';

function Display(props) {
  const [currentURL, setCurrentURL] = useState('');

  const showCurrentURL = async () => {
    try {
      // 1. Force a clean, absolute URL
      // TinyURL will reject links that don't start with http/https
      let longUrl = window.location.href;
      if (!longUrl.startsWith('http')) {
        longUrl = `https://${longUrl}`;
      }
  
      // 2. Clear previous state if needed
      // setCurrentURL(""); 
  
      const res = await fetch("/.netlify/functions/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl })
      });
  
      // 3. Improved Error Handling
      if (!res.ok) {
        // Try to get JSON error first, fallback to text
        const errorData = await res.json().catch(() => ({}));
        console.error("Function Error Details:", errorData);
        
        const errorMessage = errorData.error || "Server error";
        alert(`Error: ${errorMessage}. Check your TinyURL API key and monthly limits.`);
        return;
      }
  
      const data = await res.json();
  
      if (data.shortURL) {
        setCurrentURL(data.shortURL);
      } else {
        console.error("Short URL not found in response", data);
      }
    } catch (err) {
      console.error("Failed to shorten link:", err);
      alert("Network error: Check your internet or Netlify deployment status.");
    }
  };

  function myFunction() {
    if (!currentURL) {
      alert("No URL to copy! Click 'Get links' first.");
      return;
    }
    navigator.clipboard.writeText(currentURL)
      .then(() => alert("Copied the text: " + currentURL))
      .catch(err => console.error("Copy failed", err));
  }

  const divRef = useRef(null);
  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const divRef3 = useRef(null);
  const divRef4 = useRef(null);

  const handleLinkOpen = (ref) => {
    if (ref.current && ref.current.textContent) {
      const link = ref.current.textContent.replace(/['"]/g, "").trim();
      if (link) window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div>
      <div className='displaycover'>
        <Plink className="plink" href="https://profilertag.netlify.app" target="_blank" rel="noopener noreferrer">
          <button id='signlink'>Sign in</button>
        </Plink>
        
        <img src={bot} className='bot' alt="bot" />
        
        <div className='name'>
          {props.loadings ? <p>Loading data...</p> : <h1> {props.message} </h1>}
        </div>

        <h2 className='title'>About me ...</h2>
        <div id='about' className='birthinput'>{props.message1}</div>

        <h2 className='title'>Birthday</h2>
        <div className='birthinput'>{props.message2}</div>

        <h2 className='title'>Interests</h2>
        <Swiper className='swip' modules={[Autoplay]} autoplay={{ delay: 1000 }}>
          <SwiperSlide className='Swiperslide'>{props.message3}</SwiperSlide>
          <SwiperSlide className='Swiperslide'>{props.message4}</SwiperSlide>
          <SwiperSlide className='Swiperslide'>{props.message5}</SwiperSlide>
        </Swiper>

        {/* Hidden link refs */}
        <a className='gclink' ref={divRef} style={{ display: 'none' }}>{props.message7}</a>
        <a className='gclink' ref={divRef1} style={{ display: 'none' }}>{props.message9}</a>
        <a className='gclink' ref={divRef2} style={{ display: 'none' }}>{props.message11}</a>
        <a className='gclink' ref={divRef3} style={{ display: 'none' }}>{props.message13}</a>
        <a className='gclink' ref={divRef4} style={{ display: 'none' }}>{props.message15}</a>

        <h2 className='title'>Socials</h2>
        <div className='socialcover'>
          <div className='socialbtn' onClick={() => handleLinkOpen(divRef1)}>
            {props.empty8s ? <p className='sociale'>Empty link</p> : <div>{props.message8}</div>}
          </div>
          <div className='socialbtn' onClick={() => handleLinkOpen(divRef2)}>
            {props.empty10s ? <p className='sociale'>Empty link</p> : <div>{props.message10}</div>}
          </div>
          <div className='socialbtn' onClick={() => handleLinkOpen(divRef3)}>
            {props.empty12s ? <p className='sociale'>Empty link</p> : <div>{props.message12}</div>}
          </div>
          <div className='socialbtn' onClick={() => handleLinkOpen(divRef4)}>
            {props.empty14s ? <p className='sociale'>Empty link</p> : <div>{props.message14}</div>}
          </div>
        </div>

        <div className='gca'>
          <div className='gco' onClick={showCurrentURL}>Get links</div>
          <input 
            className='gci' 
            id='URL' 
            value={currentURL} 
            placeholder="Short link will appear here" 
            readOnly 
          />
          <div onClick={myFunction} className='gco'>
            <img id='copy' src={copy} alt="copy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;