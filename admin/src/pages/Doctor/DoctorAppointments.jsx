import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-5 text-2xl font-semibold text-gray-700'>All Appointments</p>
      
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {appointments.map((item, index) => (
          <motion.div 
            key={index} 
            className='bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition-all'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center gap-3 mb-3'>
              <img src={item.userData.image} className='w-12 h-12 rounded-full' alt='' />
              <div>
                <p className='text-lg font-medium'>{item.userData.name}</p>
                <p className='text-sm text-gray-500'>{calculateAge(item.userData.dob)} years old</p>
              </div>
            </div>
            <p className='text-sm text-gray-600'><strong>Date & Time:</strong> {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p className='text-sm text-gray-600'><strong>Fees:</strong> {currency}{item.amount}</p>
            <p className={`text-xs px-2 py-1 inline-block rounded-full ${item.payment ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {item.payment ? 'Online' : 'CASH'}
            </p>
            
            <div className='flex justify-between items-center mt-4'>
              {item.cancelled ? (
                <p className='text-red-500 font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 font-medium'>Completed</p>
              ) : (
                <div className='flex gap-3'>
                  <motion.img
                    whileTap={{ scale: 0.8 }}
                    onClick={() => cancelAppointment(item._id)}
                    className='w-8 cursor-pointer' 
                    src={assets.cancel_icon} 
                    alt='Cancel' 
                  />
                  <motion.img
                    whileTap={{ scale: 0.8 }}
                    onClick={() => completeAppointment(item._id)}
                    className='w-8 cursor-pointer' 
                    src={assets.tick_icon} 
                    alt='Complete' 
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;