import React, { useState } from "react";
import { ImCross } from "react-icons/im";

import { IoArrowBackSharp } from "react-icons/io5";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import {host} from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../store/modalSlice";
import {signup} from '../../store/authSlice'


const API_BASE_URL = `${host}/api/otp`;

const SignUpModal = () => {



    const signupModalVal=useSelector((state)=>state.modal.signupModal.value)
    const signupModalStatus=useSelector((state)=>state.modal.signupModal.status);
    const dispatch=useDispatch();
    console.log("inside signup modal new")
    // const =modalStatus.signupModal;
    const [step, setStep] = useState("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const onClose=()=>{
dispatch(toggleForm(['signup',false]));

    }

    const sendOtp = async (email) => {
        try {
            // await axios.post(`${API_BASE_URL}/generate`, `"${email}"`, {
            //     headers: { "Content-Type": "application/json" },
            // });
            toast.success("OTP sent to your email!");
            setStep("otp");
            dispatch(toggleForm(['otp',true]));
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            // const response = await axios.post(`${API_BASE_URL}/verify`, { email, otp }, {
            //     headers: { "Content-Type": "application/json" },
            // });
            const response =true;
            if (response) {
                toast.success("OTP Verified Successfully!");
                dispatch(toggleForm(['username',true]));
                setStep("username");
            } else {
                toast.error("Invalid OTP. Please try again.");
            }
        } catch (error) {
            toast.error("OTP Verification Failed. Please try again.");
        }
    };

    const saveUser = async (email, password, username) => {
        try {
            // await axios.post(`${host}/api/user`, { email, password, username }, {
            //     headers: { "Content-Type": "application/json" },
            // });
            toast.success("User Registered Successfully!");
            // setTimeout(() => {
            //     onClose();
            //     navigate("/");
            // }, 2000);
            dispatch(toggleForm(['signup',false]));
            dispatch(signup({
                email:email,
                passw:password
            }))
        } catch (error) {
            toast.error("Failed to register user. Please try again.");
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
       
        await sendOtp(email);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        await verifyOtp(email, otp);
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        await saveUser(email, password, username);
    };

    const onBack=()=>{
        if(signupModalVal=='username')
        {
            dispatch(toggleForm(['otp',true]))
            setStep('otp');
        }
        else
        {
            setStep('signup');
            dispatch(toggleForm(['signup',true]))
        }
    }

    return (
        
        <div className={`${signupModalStatus ? 'fixed inset-0 z-50 bg-black  bg-opacity-50 flex justify-center items-center' : 'hidden'}`}>
  <div className="relative bg-white rounded-lg shadow-2xl px-6 py-8 sm:px-8 md:max-w-md md:w-[90%] max-w-sm w-[70%] overflow-hidden text-center">

    {/* ==== Close Button – Top Center & Spaced ==== */}
    <div className={`flex ${signupModalVal!='signup'?'justify-between':'justify-center'} flex-row `}>
    <div className="flex justify-center mb-4">
     {signupModalVal!='signup' && <button
        onClick={onBack}
        className="text-white hover:bg-black  bg-slate-800 text-lg px-3 pb-0 pt-[6px] font-bold focus:outline-none"
        aria-label="back"
      >
        <IoArrowBackSharp className="text-lg"/>
      </button> }
    </div>
    <div className="flex justify-center mb-4">
      <button
        onClick={onClose}
        className="text-white hover:bg-black  bg-slate-800 text-md px-3 pt-[12px] pb-2  font-medium focus:outline-none"
        aria-label="close"
      >
        <ImCross className="text-md"/>
      </button>
    </div>

    </div>
    

    {/* ==== Step Title ==== */}
    <h2 className="text-2xl font-semibold mb-6">
      {step === "signup"
        ? "Sign Up"
        : step === "otp"
        ? "Verify OTP"
        : "Set Username"}
    </h2>

    {/* ==== Sign Up Form ==== */}
    {step === "signup" && (
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-4 text-left"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 box-border"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 box-border"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 box-border"
        />

        <button
          type="submit"
          className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition duration-200"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <span className="text-slate-600 hover:underline ml-1 " onClick={()=>{
            dispatch(toggleForm(['signup',false]));
            dispatch(toggleForm(['login',true]));
          }}>
            Log in
          </span>
        </p>
      </form>
    )}

    {/* ==== OTP & Username Forms stay same – skip repeating for brevity ==== */}
    {/* ==== OTP Form ==== */}
{step === "otp" && (
  <form
    onSubmit={handleVerifyOtp}
    className="flex flex-col gap-4 text-left"
  >
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 box-border"
    />

    <button
      type="submit"
      className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition duration-200"
    >
      Verify
    </button>
  </form>
)}

{/* ==== Username Form ==== */}
{step === "username" && (
  <form
    onSubmit={handleSaveUser}
    className="flex flex-col gap-4 text-left"
  >
    <input
      type="text"
      placeholder="Enter Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 box-border"
    />

    <button
      type="submit"
      className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition duration-200"
    >
      Save
    </button>
  </form>
)}

  </div>
</div>
 
    )       
};


export default SignUpModal;
