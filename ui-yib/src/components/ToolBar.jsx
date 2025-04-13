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

const ToolBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, SetIsModalOpen] = useState(false);
    const [isSignupModalOpen, SetisSignUpModalOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const modalopen = () => {
        setIsMenuOpen(false);
        SetIsModalOpen(true);
    };

    const closeModal = () => {
        SetIsModalOpen(false);
    };

    const Signupopen = () => {
        setIsMenuOpen(false);
        SetisSignUpModalOpen(true);
    };

    const closeSignup = () => {
        SetisSignUpModalOpen(false);
    };

    return (
        <Router>
            <div className="toolbar_box">
                <h2 className="text-yellow-200 ">YourInterviewBuddy</h2>
                <div className="hamburger" onClick={toggleMenu}>☰</div>
                <div className={`items ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-button" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/about" className="nav-button" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/services" className="nav-button" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link to="/tech" className="nav-button" onClick={() => setIsMenuOpen(false)}>Technologies</Link>
                    <Link to="/jb" className="nav-button" onClick={() => setIsMenuOpen(false)}>Job Board</Link>
                    {user ? (
                        <>
                            <span className="nav-button">{user.name}</span>
                            <button className="nav-button" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="nav-button" onClick={modalopen}>Login</Link>
                            <Link to="/" className="nav-button" onClick={Signupopen}>Signup</Link>
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
            </Routes>
            {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
            {isSignupModalOpen && <SignUpModal onClose={closeSignup} />}
        </Router>
    );
};

export default ToolBar;
