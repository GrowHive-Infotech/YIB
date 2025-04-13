import React from 'react'
import {Hero,LoginModal,SignUpModal} from './index'
// import SignUpModal from '../SignUpModal';
import { useSelector } from 'react-redux';
export default function Homee() {
  const loginModalStatus=useSelector((state)=>state.modal.loginModal);
  const signupModalStatus=useSelector((state)=>state.modal.signupModal.status);
    console.log("signupmodal : ",signupModalStatus);
  return (
    <div className="z-1 relative min-h-screen w-screen "> 
    <Hero />
    {signupModalStatus && 
      (<div className="z-2 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <SignUpModal />
      </div>)}
      {loginModalStatus && 
         <LoginModal />
        }
    
  </div>
  )
}
