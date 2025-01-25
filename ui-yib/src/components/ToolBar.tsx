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

// Example components for different routes
const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Services = () => <div>Services Page</div>;

const ToolBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, SetIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const modalopen = () => {
        setIsMenuOpen(!isMenuOpen);
        SetIsModalOpen(true);
    }

    const closeModal = () => {
        console.log("modal closing request");
        SetIsModalOpen(false);
    }

    return (
        <Router>
            {/* Toolbar with navigation buttons */}
            <div className="toolbar_box">
                <h2 className="logo">YourInterviewBuddy</h2>
                <div className="hamburger" onClick={toggleMenu}>
                    ☰
                </div>
                <div className={`items ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-button" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/about" className="nav-button" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/services" className="nav-button" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link to="/tech" className="nav-button" onClick={() => setIsMenuOpen(false)}>Technologies</Link>
                    <Link to="/jb" className="nav-button" onClick={() => setIsMenuOpen(false)}>Job Board</Link>
                    <Link to="/" className="nav-button" onClick={modalopen}>Login</Link>
                    <Link to="/signup" className="nav-button" onClick={() => setIsMenuOpen(false)}>Signup</Link>
                </div>
            </div>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/tech" element={<TechnologiesPage />} />
                <Route path="/technology/:techName" element={<TechnologyDetails match={"c#"} />} />
                <Route path="/jb" element={<JobBoard/>} />
            </Routes>
            {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
        </Router>
    );
};

export default ToolBar;
