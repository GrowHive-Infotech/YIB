import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { toggleForm } from '../../store/modalSlice';
import { logout } from '../../store/authSlice';
function Button() {

  const [menu,setMenu]=useState(false);
  const dispatch=useDispatch();
    const signupModalToggle=()=>{
    
     dispatch(toggleForm(['signup',true]));
  }

  const loginModalToggle=()=>{
    dispatch(toggleForm(['login',true]));
  }

  const currentUser=useSelector((state)=>state.auth.user);

  return (
    
    <div className="sm:flex hidden justify-between items-center">

        {!currentUser && (<div className="space-x-4">
          <button onClick={signupModalToggle} className="bg-slate-700 hover:bg-slate-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
            Signup
          </button>
          <button onClick={loginModalToggle}  className="bg-slate-700 hover:bg-slate-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300">
            Login
          </button>
        </div>)}
        {currentUser && ( <div onClick={()=>{setMenu(!menu)}} className="space-x-4 relative flex justify-center">
          <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-full text-xl font-medium p-0 m-0 cursor-pointer">
  {currentUser.email[0].toUpperCase()}
</div>
<div className={`${menu? 'flex flex-col justify-center items-center gap-2':'hidden'} absolute -right-4 top-[58px] z-20   bg-black rounded-md border p-2 border-white  shadow-md ` }>
<button onClick={()=>{
  console.log("Loged out")
  dispatch(logout(null));
  setMenu(false);
}} className="bg-slate-800 text-white py-2 px-4 m-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
            Logout
          </button>

</div>
 </div>
        ) }

      </div>
  )
}

export default Button