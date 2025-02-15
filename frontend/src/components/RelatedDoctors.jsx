import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-[#262626] px-6'>
            {/* Title Section */}
            <motion.div 
                className='text-center'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className='text-3xl font-semibold'>Related Doctors</h1>
                <p className='text-sm sm:w-2/3 mx-auto mt-2'>Simply browse through our extensive list of trusted doctors.</p>
            </motion.div>

            {/* Doctor Cards */}
            <motion.div 
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {relDoc.map((item, index) => (
                    <motion.div 
                        key={index} 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
                        className='bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Doctor Image */}
                        <motion.img 
                            className='w-full h-48 object-cover bg-[#EAEFFF]' 
                            src={item.image} 
                            alt={item.name} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        />

                        {/* Doctor Info */}
                        <div className='p-5 text-center'>
                            <div className={`flex items-center justify-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <span className={`w-3 h-3 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <h3 className='text-lg font-semibold text-[#262626] mt-2'>{item.name}</h3>
                            <p className='text-sm text-[#5C5C5C]'>{item.speciality}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default RelatedDoctors;
