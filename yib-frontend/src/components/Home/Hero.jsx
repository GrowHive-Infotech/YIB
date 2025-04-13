import React from 'react'
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../store/modalSlice';
function Hero() {
 const dispatch=useDispatch();
 const currentUser=useSelector((state)=>state.auth.user);
 
    return (
        <div className='text-center  flex justify-center flex-col border-r-2 rounded-md p-3 '>
        <TypeAnimation className='font-semibold mmd:text-3xl md:text-2xl  text-xl'  sequence={
            ["Welcome to YourInterviewBuddy"]
          } wrapper='span' repeat={1} speed={50}/>
          <p className='font-medium md:text-lg sm:text-[17px] text-md '>Your one-stop solution for interview preparation, job hunting, and career growth.</p>
          {currentUser!=null  ? (<Link to={'/about'}>
                    <button className="bg-green-700 hover:bg-green-900">Get Started</button>
                </Link>):  
                <div className='flex justify-center'>
<button  onClick={()=>
                    dispatch(toggleForm(['signup',true]))
                } className="bg-green-700 hover:bg-green-900 ">Get Started</button>

                </div>
                
}    
          </div>
      )
  
}

export default Hero