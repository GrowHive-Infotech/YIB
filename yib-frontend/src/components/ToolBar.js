import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './ToolBar.css';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import TechnologiesPage from './TechnologiesPage';
import TechnologyDetails from './TechnologyDetails';
import JobBoard from './JobBoard';
import ServicesPage from './Services';
import LoginModal from './LoginPage';
import SignUpModal from './SignUpModal';
import { useAuth } from './AuthContext';
import MultiStepForm from '../ResumeBuilder/MultiStepForm';
import ResumePreview from '../ResumeBuilder/ResumePreview';

const ToolBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const openLoginModal = () => {
    setIsMenuOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsMenuOpen(false);
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <Router>
      <div className="toolbar_box">
        <h2 className="logo">YourInterviewBuddy</h2>
        <div className="hamburger" onClick={toggleMenu}>☰</div>
        <div className={`items ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-button" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" className="nav-button" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/services" className="nav-button" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/tech" className="nav-button" onClick={() => setIsMenuOpen(false)}>Technologies</Link>
          <Link to="/jb" className="nav-button" onClick={() => setIsMenuOpen(false)}>Job Board</Link>
          <Link to="/resume" className="nav-button" onClick={() => setIsMenuOpen(false)}>Resume</Link>
          <Link to="/resume-preview" className="nav-button" onClick={() => setIsMenuOpen(false)}>Resume Preview</Link>
          {user ? (
            <>
              <span className="nav-button">{user.name}</span>
              <button className="nav-button" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={openLoginModal}>Login</button>
              <button className="nav-button" onClick={openSignUpModal}>Signup</button>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/tech" element={<TechnologiesPage />} />
        <Route path="/technology/:techName/:view" element={<TechnologyDetails />} />
        <Route path="/interview/:techName/:view" element={<TechnologyDetails />} />
        <Route path="/jb" element={<JobBoard />} />
        <Route path="/resume" element={<MultiStepForm />} />
        <Route path="/resume-preview" element={<ResumePreview />} />
      </Routes>

      {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />}
      {isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} />}
    </Router>
  );
};

export default ToolBar;
