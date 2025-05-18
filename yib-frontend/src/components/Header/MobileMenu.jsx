import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toggleForm } from '../../store/modalSlice';
import { Link } from 'react-router-dom';

function MobileMenu() {
  const menuStatus=useSelector((state)=>state.modal.mobileMenu);
  const dispatch=useDispatch();
  

  const currentUser=useSelector((state)=>state.auth.user);
  return (
    
    <div className='flex flex-row items-center'>
    <div className='relative top-0 right-0 lg:hidden  flex '>
      <IoMdMenu onClick={(e)=>{
        dispatch(toggleForm(['menu2',false]))
        dispatch(toggleForm(['menu',!menuStatus]))}} className={`text-3xl text-white cursor-pointer mr-3`}/>
    </div>
    <div className={`${menuStatus? 'flex flex-col justify-center items-center gap-2':'hidden'} absolute -right-5 top-[48px] z-20  w-28 bg-black rounded-md border p-2 border-white  shadow-md ` }>
    <div  className={`cursor-pointer w-full p-1 text-center  border-2 border-white  `}  onClick={()=>{dispatch(toggleForm(['menu',false]))}}> <Link to={'/'} className='no-underline text-white'>Home</Link> </div>
    <div  className={`cursor-pointer w-full p-1 text-center border-white border-2 `}  onClick={()=>{dispatch(toggleForm(['menu',false]))}} > <Link to={'/about'} className='no-underline text-white'>About Us</Link> </div>
    <div  className={`cursor-pointer w-full p-1 text-center border-white border-2 `}  onClick={()=>{dispatch(toggleForm(['menu',false]))}} ><Link to={'/blogs'} className='no-underline text-white'>Blogs</Link></div>
    <div  className={`cursor-pointer w-full p-1 text-center border-white border-2 `}  onClick={()=>{dispatch(toggleForm(['menu',false]))}} ><Link to={'/jobs/all'} className='no-underline text-white'>Jobs</Link></div>  
     <div  className={`cursor-pointer w-full p-1 text-center border-white border-2 pb-1 `}  onClick={()=>{dispatch(toggleForm(['menu',false]))}} ><Link to={'/resume'} className='no-underline text-white'>Resume</Link></div>
{!currentUser && (<div  className={`sm:hidden block cursor-pointer  py-2 w-24  rounded-md text-center border-white border-2 bg-slate-700 hover:bg-slate-500  `}  onClick={()=>{
  dispatch(toggleForm(['menu',false]))
  dispatch(toggleForm(['signup',true]))}} >Signup</div>
)}
{!currentUser && <div  className={`sm:hidden span cursor-pointer  py-2 w-24  rounded-md text-center  border-white border-2 bg-slate-700 hover:bg-slate-500 `}  onClick={()=>{
  dispatch(toggleForm(['menu',false]))
  dispatch(toggleForm(['login',true]))
  

  }} >Login</div> 
}
    </div>
    


    {/* <Switch/> */}
    </div>
  
  )
}

export default MobileMenu