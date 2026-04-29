import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Outlet /> {/* or your <Routes /> or page content */}
      </main>

      <Footer /> {/* ✅ Make sure this is actually here */}
    </div>
    );
};

export default RootLayout;