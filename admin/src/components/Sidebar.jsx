import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const renderMenuItem = (to, icon, label) => (
    <motion.li
      className="relative group"
      variants={menuVariants}
    >
      <NavLink 
        to={to} 
        className={({ isActive }) =>
          `flex items-center gap-4 py-3 px-5 md:px-8 rounded-lg transition-all duration-300 ${
            isActive ? 'bg-gray-100 border-l-4 border-primary' : 'hover:bg-gray-50'
          }`
        }
      >
        <img className="w-5" src={icon} alt="" />
        <p className="hidden md:block">{label}</p>
      </NavLink>
    </motion.li>
  );

  return (
    <motion.div
      className="min-h-screen w-64 bg-white shadow-lg border-r px-4 py-6"
      initial="hidden"
      animate="visible"
    >
      {aToken && (
        <ul className="text-[#515151] space-y-2">
          {renderMenuItem('/admin-dashboard', assets.home_icon, 'Dashboard')}
          {renderMenuItem('/all-appointments', assets.appointment_icon, 'Appointments')}
          {renderMenuItem('/add-doctor', assets.add_icon, 'Add Doctor')}
          {renderMenuItem('/doctor-list', assets.people_icon, 'Doctors List')}
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] space-y-2 mt-6">
          {renderMenuItem('/doctor-dashboard', assets.home_icon, 'Dashboard')}
          {renderMenuItem('/doctor-appointments', assets.appointment_icon, 'Appointments')}
          {renderMenuItem('/doctor-profile', assets.people_icon, 'Profile')}
        </ul>
      )}
    </motion.div>
  );
};

export default Sidebar;
