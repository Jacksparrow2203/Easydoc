import React from 'react';
import { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className='m-5 grid grid-cols-1 gap-6 lg:grid-cols-3'>
      {/* Stats Cards */}
      <motion.div whileHover={{ scale: 1.05 }} className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center border'>
        <img className='w-12' src={assets.earning_icon} alt='' />
        <p className='text-2xl font-semibold text-gray-700'>{currency}{dashData.earnings}</p>
        <p className='text-gray-500'>Earnings</p>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.05 }} className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center border'>
        <img className='w-12' src={assets.appointments_icon} alt='' />
        <p className='text-2xl font-semibold text-gray-700'>{dashData.appointments}</p>
        <p className='text-gray-500'>Appointments</p>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.05 }} className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center border'>
        <img className='w-12' src={assets.patients_icon} alt='' />
        <p className='text-2xl font-semibold text-gray-700'>{dashData.patients}</p>
        <p className='text-gray-500'>Patients</p>
      </motion.div>
      
      {/* Latest Appointments */}
      <div className='lg:col-span-3 bg-white rounded-lg shadow-md p-6 border'>
        <div className='flex items-center gap-3 mb-4'>
          <img src={assets.list_icon} alt='' />
          <p className='text-xl font-semibold'>Latest Bookings</p>
        </div>
        <div className='space-y-4'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} key={index} className='flex items-center justify-between p-4 bg-gray-50 rounded-md hover:shadow-md transition-all'>
              <div className='flex items-center gap-3'>
                <img className='rounded-full w-12' src={item.userData.image} alt='' />
                <div>
                  <p className='text-gray-700 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-500 text-sm'>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
              </div>
              {item.cancelled ? (
                <p className='text-red-500 text-sm font-semibold'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-sm font-semibold'>Completed</p>
              ) : (
                <div className='flex gap-3'>
                  <motion.img whileTap={{ scale: 0.9 }} onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt='' />
                  <motion.img whileTap={{ scale: 0.9 }} onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer' src={assets.tick_icon} alt='' />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;