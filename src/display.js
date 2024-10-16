import './display.css'
import React, { useState,useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import bot from './profilerbot.png' 
import copy from './copyiconw.png' 
import { Link } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';


function Display(props){

    const [currentURL, setCurrentURL] = useState('');

    const showCurrentURL = () => {
        setCurrentURL( "Check my profile -> "  + window.location.href);
    }

    function myFunction() {
        // Get the text field
        var copyText = document.getElementById("URL");
      
        // Select the text field
    
         // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
      
        // Alert the copied text
        alert("Copied the text: " + copyText.value);
      }

      
      const [isClickable, setIsClickable] = useState(true);
      const fest = props.message7

      const divRef = useRef(null)
     const [seven, setSeven] = useState()
      function groupc(){
        if(fest===""){setIsClickable(true)}
        if(fest!==""){setIsClickable(false)}
       
        const link = divRef.current.textContent
        const link1 = link.replace(/['"]/g, "")
        setSeven(link1)
         window.open(link1, "_blank", "noopener,noreferrer");
        
         if(fest===""){setIsClickable(true)}
         if(fest!==""){setIsClickable(false)}
        
      }

      
     

      const divRef1 = useRef(null)
     const [seven1, setSeven1] = useState()
      function groupc1(){
        const link1 = divRef1.current.textContent
        const link11 = link1.replace(/['"]/g, "")
        setSeven1(link11)
         window.open(link11, "_blank", "noopener,noreferrer");
        
      }

      const divRef2 = useRef(null)
      const [seven2, setSeven2] = useState()
       function groupc2(){
         const link2 = divRef2.current.textContent
         const link12 = link2.replace(/['"]/g, "")
         setSeven2(link12)
          window.open(link12, "_blank", "noopener,noreferrer");
         
       }

       const divRef3 = useRef(null)
      const [seven3, setSeven3] = useState()
       function groupc3(){
         const link3 = divRef3.current.textContent
         const link13 = link3.replace(/['"]/g, "")
         setSeven3(link13)
          window.open(link13, "_blank", "noopener,noreferrer");
         
       }

       const divRef4 = useRef(null)
      const [seven4, setSeven4] = useState()
       function groupc4(){
         const link4 = divRef4.current.textContent
         const link14 = link4.replace(/['"]/g, "")
         setSeven4(link14)
          window.open(link14, "_blank", "noopener,noreferrer");
         
       }



    return(
        <div >
            
        <div className='displaycover' >


        <img src={bot} className='bot' />
           <h1 className='name'> {props.message} </h1>
           <h2 className='title'>About me ...  </h2>
           <div id='about' className='birthinput'>{props.message1}</div>
           <h2 className='title'>Birthday  </h2>
           <div  className='birthinput'>{props.message2}</div>
           <h2 className='title'>Interests</h2>
    <Swiper 
         className='swip'
        modules={[Autoplay]}
        autoplay={{delay:1000}}
    >
      <SwiperSlide className='Swiperslide' >{props.message3}</SwiperSlide>
      <SwiperSlide className='Swiperslide' >{props.message4}</SwiperSlide>
      <SwiperSlide className='Swiperslide' >{props.message5}</SwiperSlide>
    
    </Swiper>

           <div     style={{ pointerEvents: isClickable ? 'auto' : 'none' }}  onClick={groupc}  className='gc'>{props.message6}
           
           </div>
           <a className='gclink' ref={divRef}  > {props.message7} </a> 

            <h2 className='title'>Socials  </h2>
            <div className='socialcover'>
                <div className='socialbtn' onClick={groupc1}  >{props.message8}</div>  
                <div className='socialbtn'  onClick={groupc2} > {props.message10}</div>
                <div className='socialbtn' onClick={groupc3} > {props.message12}</div>
                <div className='socialbtn' onClick={groupc4} >{props.message14}</div>

                 <a className='gclink' ref={divRef1}  > {props.message9} </a>  <a className='gclink' ref={divRef2}  > {props.message11} </a>
                <a className='gclink' ref={divRef3}  > {props.message13} </a>  <a className='gclink' ref={divRef4}  > {props.message15} </a>

            </div>

                
              
        <div className='gca'>
        <div className='gco'  onClick={showCurrentURL}>Get link </div>
        <input className='gci' id='URL'value=  {currentURL}/><div  onClick={myFunction}  className='gco' > <img id='copy' src={copy}/></div>
        </div>  

        </div>
        </div>
    );
}
export default Display