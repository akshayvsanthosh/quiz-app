import React, { useEffect } from 'react'
import quizImage from '../assets/logo2.png'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {

  useEffect(()=>{
    AOS.init();
  })

  AOS.init({
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 120,
    delay: 0,
    duration: 400,
    easing: 'ease',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });

  return (
    <div className='w-100 homeContainer d-flex flex-column align-items-center p-5' style={{height:"100vh", backgroundColor:"#31acff"}}>
      <img data-aos="zoom-in-up" data-aos-duration="2000" src={quizImage} alt="Image" />
      <Link className='btn mt-5' style={{backgroundColor:"#f81f40", fontSize:"19px", fontWeight:"600", width:"8%"}} to={'/quiz'}>START</Link>
    </div>
  )
}

export default Home
