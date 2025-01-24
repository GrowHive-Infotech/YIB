import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './ToolBar.css';

// Example components for different routes
const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Services = () => <div>Services Page</div>;

const ToolBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                    <Link to="/login" className="nav-button" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    <Link to="/signup" className="nav-button" onClick={() => setIsMenuOpen(false)}>Signup</Link>
                </div>
            </div>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
            </Routes>
        </Router>
    );
};

export default ToolBar;
