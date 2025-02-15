import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className='max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-xl space-y-12'>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className='text-center text-4xl font-bold text-gray-800 py-12 border-b border-gray-300'
      >
        <p>CONTACT <span className='text-primary'>US</span></p>
      </motion.div>

      <div className='flex flex-col md:flex-row items-center gap-16 my-10'>
        <motion.img 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className='w-full md:max-w-md rounded-lg shadow-lg' 
          src={assets.contact_image} 
          alt='Contact Us' 
        />

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='flex flex-col justify-center items-start gap-6 text-lg text-gray-700'
        >
          <p className='font-semibold text-xl text-gray-800'>OUR OFFICE</p>
          <p className='text-gray-500'>Sion Jain Society <br /> SIES College</p>
          <p className='text-gray-500'>Tel: 9892836690 <br /> Email: samuel@gmail.com</p>
          <p className='font-semibold text-xl text-gray-800'>CAREERS AT Easydoc</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
