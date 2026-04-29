import React from 'react';
import { Outlet } from 'react-router';
import { Player } from '@lottiefiles/react-lottie-player';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import treadmillAnimation from '../assets/Work From Home - Treadmill.json'; // update path accordingly

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-[#f0f4f8] px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8">
                    {/* Auth Content */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <Outlet />
                    </div>

                    {/* Lottie Animation */}
                    <div className="hidden md:flex md:w-1/2 justify-center">
                        <Player
                            autoplay
                            loop
                            src={treadmillAnimation}
                            style={{ height: '600px', width: '600px' }}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;
