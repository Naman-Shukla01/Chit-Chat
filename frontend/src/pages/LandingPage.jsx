import React from 'react'
import {useNavigate} from "react-router-dom"

const LandingPage = ({user}) => {
  const navigate = useNavigate();

  // if(user) navigate("/api/home")
  return (
    <div className='relative flex flex-col items-center justify-center'>
      <div><img className="absolute h-20 w-20 left-10" src=".././login-page.jpg" alt="" /></div>
      <div><img className=" block object-cover mt-20 not-sm:object-scale-down not-sm:h-fit mt-10 h-[50vh] w-[40vw] not-sm:w-fit" src=".././login-page.jpg" alt="" /></div>
        <div><h1 className='md:text-5xl m-10 text-3xl '><span className='text-orange-400'>Connect</span> with your circle in a fun way</h1></div>
      <button onClick={()=>navigate("/api/auth")} className="p-5 not-sm:p-1 not-sm:text-xl sm:text-2xl md:text-3xl text-white bg-orange-400 border-2 border-orange-400 hover:scale-[95%] hover:text-orange-400 hover:bg-white  transition-transform rounded-xl">Get Started</button>
    </div>
  )
}

export default LandingPage