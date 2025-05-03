import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";

import { useAuth } from "../AuthContext";
import { CSSTransition } from "react-transition-group";
// import "./LoginPage.css";
import "../fade.css"; // We'll add simple fade-in/fade-out CSS here
import {host} from "../../constants";
import { useSelector ,useDispatch} from "react-redux";
import { toggleForm } from "../../store/modalSlice";
import { login,logout } from "../../store/authSlice";
import { toast } from "react-toastify";
const LoginModal = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    // const { setUser, logout } = useAuth();
    const loginModalStatus=useSelector((state)=>state.modal.loginModal);
    const dispatch=useDispatch();
    // useEffect(() => {
    //     let timeout;

    //     if (loginModalStatus) {
    //         timeout = setInterval(() => {
    //             dispatch(logout());
    //             onClose();
    //         }, 5 * 60 * 1000); // Auto logout after 5 minutes
    //     }

    //     return () => clearInterval(timeout);
    // }, [loginModalStatus, onClose, logout]);

    useEffect(() => {
        if (loginModalStatus) {
            setFormData({ username: "", password: "" });
            setErrors({ username: "", password: "" });
            setMessage("");
        }
    }, [loginModalStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = { username: "", password: "" };
        if (!formData.username) newErrors.username = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    };

    const onClose=()=>{
      toast.dismiss();
      dispatch(toggleForm(['login',false]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setMessage("");

        try {
          dispatch(toggleForm(['login',false]));
          dispatch(login({
            email:formData.username,
            passw:formData.password
          }));
            // const response = await axios.post(`${host}/api/user/login`, {
            //     Email: formData.username,
            //     Password: formData.password,
            // });

            // if (response.status === 200) {
            //     setMessage("Login successful!");
            //     setUser(response.data);
            //     // localStorage.setItem("user", JSON.stringify(response.data));
            //     setTimeout(() => onClose(), 1500);
            // }
        } 
        catch (error) {
            if (error.response) {
                setMessage(error.response.data?.message || "Login failed.");
            } else if (error.request) {
                setMessage("No response from server. Please check your connection.");
            } else {
                setMessage("Something went wrong. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

      if (!loginModalStatus) return null;
    
      return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" ></div>
    
          {/* Modal box */}
          <div className="relative z-10 bg-white p-6 md:p-8 rounded-lg shadow-lg w-[70%] max-w-md text-left animate-fade-in">
            {/* Close button */}
            <div className="flex justify-center mb-4">
      <button
        onClick={onClose}
        className="text-white hover:bg-black  bg-slate-800 text-md px-3 pb-2 pt-[10px]  font-semibold focus:outline-none"
        aria-label="close"
      >
        <ImCross className="text-sm"/>
      </button>
    </div>
    
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-6">Login</h2>
    
            {/* Success/Error Messages */}
            {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
    
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 box-border"
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>
    
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 box-border"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition duration-300 disabled:bg-gray-400"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p className="text-center text-sm text-gray-600  cursor-pointer">
                        Do not have an account?
                        <span className="text-slate-600 hover:underline ml-1 " onClick={()=>{
                          dispatch(toggleForm(['signup',true]));
                          dispatch(toggleForm(['login',false]));
                        }}>
                          Sign Up
                        </span>
                      </p>
            </form>
          </div>
        </div>
      );
    };
    

export default LoginModal;
