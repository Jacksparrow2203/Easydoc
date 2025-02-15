import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            className='relative flex flex-col items-center justify-center bg-white rounded-lg p-8 shadow-xl w-[400px] h-[400px] mx-auto my-20'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {/* Image */}
            <motion.div 
                className='w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 shadow-md'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <img className='w-24' src={assets.appointment_img} alt="Doctor Consultation" />
            </motion.div>

            {/* Text Content */}
            <motion.h1 
                className='text-2xl font-semibold text-gray-800 mt-5 text-center'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                Book an Appointment
            </motion.h1>
            
            <motion.p 
                className='text-base text-gray-600 mt-2 text-center'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                With 100+ Trusted Doctors
            </motion.p>

            {/* Button */}
            <motion.button 
                onClick={() => { navigate('/login'); scrollTo(0, 0); }} 
                className='bg-white text-red px-6 py-3 rounded-full font-medium mt-5 hover:scale-105 transition-transform duration-300 shadow-md'
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Get Started
            </motion.button>
        </motion.div>
    );
};

export default Banner;
