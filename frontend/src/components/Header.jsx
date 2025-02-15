import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.div 
            className="relative flex flex-col-reverse md:flex-row items-center bg-white text-gray-900 rounded-lg px-6 md:px-10 lg:px-20 py-12 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {/* --------- Header Left (Text Content) --------- */}
            <motion.div 
                className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    Your Health, <br /> Our Priority!
                </h1>
                <p className="text-sm font-light text-gray-600">
                    Browse through our extensive list of trusted doctors and book your appointment hassle-free.
                </p>
                
                {/* Group Profiles */}
                <motion.div 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <img className="w-24" src={assets.group_profiles} alt="Group Profiles" />
                    <p className="text-xs text-gray-600">100+ Trusted Doctors</p>
                </motion.div>

                {/* Call-to-Action Button */}
                <motion.a 
                    href="#speciality" 
                    className="flex items-center gap-2 bg-primary px-6 py-2 rounded-full text-white text-sm font-medium shadow-md hover:scale-105 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                >
                    Book Appointment <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
                </motion.a>
            </motion.div>

            {/* --------- Header Right (Image) --------- */}
            <motion.div 
                className="w-full md:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <img 
                    className="w-full max-w-lg rounded-lg drop-shadow-xl" 
                    src={assets.header_img} 
                    alt="Doctor Consultation" 
                />
            </motion.div>
        </motion.div>
    );
};

export default Header;
