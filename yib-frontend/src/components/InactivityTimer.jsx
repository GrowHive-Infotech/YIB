import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
// import { logoutUser } from './store/actions'; // Replace with your actual logout action
import { useNavigate } from 'react-router-dom';
import { clearResume } from '../store/resumeSlice';
const InactivityTimer = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerId = useRef(null);

  const logout = () => {
    // Clear localStorage
    localStorage.clear();

    // Dispatch logout action to Redux store
    dispatch(logout(null));
    dispatch(clearResume(null));

    // Redirect to login page
    navigate('/');
  };

  const resetTimer = () => {
    if (timerId.current) clearTimeout(timerId.current);
    timerId.current = setTimeout(logout, 2 * 60 * 1000); // 20 minutes
  };

  useEffect(() => {
    // List of events that indicate user activity
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

    // Add event listeners
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Initialize timer
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  return <>{children}</>;
};

export default InactivityTimer;
