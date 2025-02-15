import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { motion } from 'framer-motion';

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium mb-5'>All Doctors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {doctors.map((item, index) => (
          <motion.div 
            key={index}
            className='border border-gray-300 rounded-xl overflow-hidden shadow-lg bg-white p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300'
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.img 
              src={item.image} 
              alt={item.name} 
              className='w-full h-40 object-cover rounded-t-xl' 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className='p-4 text-center'>
              <p className='text-lg font-semibold text-gray-800'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.speciality}</p>
              <div className='mt-3 flex items-center justify-center gap-2'>
                <input 
                  onChange={() => changeAvailability(item._id)} 
                  type='checkbox' 
                  checked={item.available} 
                  className='cursor-pointer'
                />
                <p className='text-sm text-gray-600'>Available</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
