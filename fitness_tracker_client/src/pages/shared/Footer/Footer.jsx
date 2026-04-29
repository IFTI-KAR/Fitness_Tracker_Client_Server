import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../../../assets/MyFitnessPal_Logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="FitnessPal Logo" className="h-10 w-auto rounded" />
            <h2 className="text-2xl font-bold text-white">FitnessPal</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Our company is at the forefront of revolutionizing the fitness industry. We provide innovative solutions that empower individuals to lead healthier, more active lifestyles.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="text-sm space-y-1">
            <li>Email: support@fitnesspal.com</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Address: 123 Fit Street, Healthy City, Wellnessland</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaYoutube /></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/trainers" className="hover:text-white">All Trainers</a></li>
            <li><a href="/classes" className="hover:text-white">All Classes</a></li>
            <li><a href="/community" className="hover:text-white">Community</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} FitnessPal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
