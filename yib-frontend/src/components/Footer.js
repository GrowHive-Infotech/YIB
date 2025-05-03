import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-6 mt-8  ">
      <div className="max-w-6xl mx-auto px-4">
        {/* About Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-2">About Us</h3>
            <p className="text-sm">
              YourInterviewBuddy helps job seekers prepare for interviews with
              resources, tools, and guidance tailored to their needs. Start your
              journey toward career success today!
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><Link ho="/" className="hover:text-gray-400 text-white no-underline">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-400 text-white no-underline">About</Link></li>
              <li><Link to="/services" className="hover:text-gray-400 text-white no-underline">Services</Link></li>
              <li><Link to="/login" className="hover:text-gray-400 text-white no-underline">Login</Link></li>
              <li><Link to="/signup" className="hover:text-gray-400 text-white no-underline">Signup</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">Email: <Link  to={"mailto:support@yourinterviewbuddy.com"} className="hover:text-gray-400 text-white no-underline">support@yourinterviewbuddy.com</Link></p>
            <p className="text-sm">Phone: +91-9876543210</p>
            <p className="text-sm">Address: 123 Career Lane, Pune, India</p>
          </div>

          {/* Social Media Section */}
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="space-x-4">
            <Link href="https://facebook.com"  rel="noopener noreferrer" className="text-white no-underline hover:text-gray-400">Facebook</Link>
              <Link href="https://twitter.com"  rel="noopener noreferrer" className="text-white no-underline hover:text-gray-400">Twitter</Link>
              <Link href="https://linkedin.com"  rel="noopener noreferrer" className="text-white no-underline hover:text-gray-400">LinkedIn</Link>
              <Link href="https://instagram.com"  rel="noopener noreferrer" className="hover:text-gray-400 text-white no-underline">Instagram</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom mt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} YourInterviewBuddy. All rights reserved. |
            <Link to="/privacy-policy" className="text-white no-underline hover:text-gray-400"> Privacy Policy</Link> |
            <Link to="/terms" className="hover:text-gray-400 text-white no-underline"> Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
