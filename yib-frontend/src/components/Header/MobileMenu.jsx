import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toggleForm } from '../../store/modalSlice';

function MobileMenu() {
  const [menu,setMenu]=useState(false)
  const dispatch=useDispatch();
  

  const currentUser=useSelector((state)=>state.auth.user);
  return (
    
    <div className='flex flex-row items-center'>
    <div className='relative top-0 right-0 md:hidden  flex '>
      <IoMdMenu onClick={(e)=>{setMenu(!menu)}} className={`text-3xl text-white cursor-pointer mr-3`}/>
    </div>
    <div className={`${menu? 'flex flex-col justify-center items-center gap-2':'hidden'} absolute -right-5 top-[48px] z-20  w-28 bg-black rounded-md border p-2 border-white  shadow-md ` }>
    <div  className={`cursor-pointer w-full p-1 text-center  border-2 border-white  `}  onClick={()=>{setMenu(false)}} >Home</div>
    <div  className={`cursor-pointer w-full p-1 text-center border-white border-2 `}  onClick={()=>{setMenu(false)}} >About Us</div>
    <div  className={`cursor-pointer w-full p-1 text-center border-white border-2 `}  onClick={()=>{setMenu(false)}} >Blogs</div>
    <div  className={`cursor-pointer w-full p-1 text-center border-white border-2 `}  onClick={()=>{setMenu(false)}} >Jobs</div>  
     
{currentUser? (<div  className={`sm:hidden block cursor-pointer  py-2 w-24  rounded-md text-center border-white border-2 bg-slate-700 hover:bg-slate-500  `}  onClick={()=>{
setMenu(false)
dispatch(logout())}} >Logout</div>
) : (<div  className={`sm:hidden block cursor-pointer  py-2 w-24  rounded-md text-center border-white border-2 bg-slate-700 hover:bg-slate-500  `}  onClick={()=>{
  setMenu(false);
  dispatch(toggleForm(['signup',true]))}} >Signup</div>
)}
{!currentUser && <div  className={`sm:hidden span cursor-pointer  py-2 w-24  rounded-md text-center  border-white border-2 bg-slate-700 hover:bg-slate-500 `}  onClick={()=>{
  setMenu(false);
  dispatch(toggleForm(['login',true]))
  

  }} >Login</div> 
}
    </div>
    


    {/* <Switch/> */}
    </div>
  
  )
}

export default MobileMenu