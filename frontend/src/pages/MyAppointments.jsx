import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState('');

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-6">
      <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="pb-4 mt-8 text-2xl font-bold text-gray-700 border-b">My Appointments</motion.p>
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white shadow-md rounded-lg">
            <img className="w-32 h-32 object-cover rounded-md" src={item.docData.image} alt="" />
            <div className="flex-1 text-sm text-gray-600 space-y-2">
              <p className="text-lg font-semibold text-gray-800">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="font-medium">Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className="mt-1"><span className="text-sm font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div className="flex flex-col gap-2">
              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                <button onClick={() => setPayment(item._id)} className="py-2 px-6 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-300 transition-all duration-300">Pay Now</button>
              )}
              {payment === item._id && (
                <button className="py-2 px-6 border rounded-lg text-green-600 bg-green-100">Completed</button>
              )}
              {item.isCompleted && (
                <button className="py-2 px-6 border rounded-lg text-green-600 bg-green-100">Completed</button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button onClick={() => cancelAppointment(item._id)} className="py-2 px-6 border rounded-lg text-red-600 bg-red-100 hover:bg-red-300 transition-all duration-300">Cancel Appointment</button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="py-2 px-6 border rounded-lg text-red-500 bg-red-100">Appointment Cancelled</button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyAppointments;
