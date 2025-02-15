import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-xl space-y-12'>
      <div className='text-center text-4xl font-bold text-gray-800 py-12 border-b border-gray-300'>
        <p>ABOUT <span className='text-primary'>US</span></p>
      </div>

      <div className='flex flex-col-reverse md:flex-row items-center gap-16'>
        <div className='flex-1 space-y-6 text-lg text-gray-700'>
          <p>Welcome to <span className='font-semibold'>Easydoc</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing health records.</p>
          <p>At Easydoc, we are dedicated to improving healthcare technology. We integrate the latest advancements to enhance the user experience and deliver superior service. Whether it's your first appointment or ongoing care management, Easydoc is here for you.</p>
          <h3 className='text-2xl font-bold text-gray-900 mt-6'>Our Vision</h3>
          <p>Our vision is to bridge the gap between patients and healthcare providers, ensuring seamless access to medical care whenever needed.</p>
        </div>
        <img className='w-full md:max-w-lg rounded-lg shadow-lg' src={assets.about_image} alt='About Us' />
      </div>

      <div className='text-center text-3xl font-bold text-gray-800 py-10 border-b border-gray-300'>
        <p>WHY <span className='text-primary'>CHOOSE US</span></p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
        <div className='bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
          <h4 className='text-xl font-bold text-primary'>EFFICIENCY</h4>
          <p className='mt-4 text-gray-600'>Streamlined appointment scheduling tailored to your busy lifestyle.</p>
        </div>
        <div className='bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
          <h4 className='text-xl font-bold text-primary'>CONVENIENCE</h4>
          <p className='mt-4 text-gray-600'>Easily access a network of trusted healthcare professionals near you.</p>
        </div>
        <div className='bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
          <h4 className='text-xl font-bold text-primary'>PERSONALIZATION</h4>
          <p className='mt-4 text-gray-600'>Receive tailored recommendations and reminders to stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
