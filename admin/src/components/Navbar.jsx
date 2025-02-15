import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  };

  return (
    <motion.div 
      className="flex items-center justify-between px-6 sm:px-12 py-4 bg-white shadow-md rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Logo and User Type */}
      <div className="flex items-center gap-3">
        <img 
          onClick={() => navigate('/')} 
          className="w-36 sm:w-44 cursor-pointer hover:scale-105 transition-transform duration-300" 
          src={assets.admin_logo} 
          alt="Logo" 
        />
        <motion.p 
          className="px-3 py-1 text-xs font-medium border border-gray-500 text-gray-600 rounded-full bg-gray-100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {aToken ? 'Admin' : 'Doctor'}
        </motion.p>
      </div>

      {/* Logout Button */}
      <motion.button
        onClick={logout}
        className="bg-[#cb1111] hover:bg-red-700 text-white text-sm px-8 py-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
