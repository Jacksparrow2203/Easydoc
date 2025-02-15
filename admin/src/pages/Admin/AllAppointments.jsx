import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn'>
      <p className='mb-5 text-2xl font-semibold text-gray-800 text-center'>All Appointments</p>

      <div className='bg-white border rounded-lg shadow-md overflow-hidden'>
        <div className='hidden sm:grid grid-cols-7 py-4 px-6 bg-gray-100 font-medium text-gray-700 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap sm:grid sm:grid-cols-7 items-center text-gray-700 py-4 px-6 border-b hover:bg-gray-50 transition-all duration-300 ease-in-out'
            key={index}
          >
            <p className='text-center'>{index + 1}</p>
            <div className='flex items-center gap-3'>
              <img src={item.userData.image} className='w-10 h-10 rounded-full border shadow-sm' alt='' />
              <p>{item.userData.name}</p>
            </div>
            <p className='text-center'>{calculateAge(item.userData.dob)}</p>
            <p className='text-center'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-3'>
              <img src={item.docData.image} className='w-10 h-10 rounded-full border shadow-sm' alt='' />
              <p>{item.docData.name}</p>
            </div>
            <p className='text-center font-medium'>{currency}{item.amount}</p>
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-bold animate-pulse'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 text-xs font-bold animate-pulse'>Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className='w-8 cursor-pointer transition-transform transform hover:scale-110'
                src={assets.cancel_icon}
                alt='Cancel'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
