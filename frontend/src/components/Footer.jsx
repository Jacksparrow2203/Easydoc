import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='bg-white py-16 px-6 md:px-20'>
      
      {/* Top Section */}
      <div className='flex flex-col items-center text-center gap-8'>
        <img className='w-40' src={assets.logo} alt='Logo' />
        <p className='max-w-lg text-gray-600 leading-6'>
          This is my final year project for 2024-25 under Maya ma'am. Hope this is a success.
        </p>
      </div>
      
      {/* Links Section */}
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 text-center mt-10 text-sm'>
        <div>
          <p className='text-lg font-medium mb-3 border-b-2 border-gray-300 inline-block pb-1'>Company</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-primary transition'>Home</li>
            <li className='hover:text-primary transition'>About us</li>
            <li className='hover:text-primary transition'>Delivery</li>
            <li className='hover:text-primary transition'>Privacy Policy</li>
          </ul>
        </div>
        
        <div>
          <p className='text-lg font-medium mb-3 border-b-2 border-gray-300 inline-block pb-1'>Contact</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-primary transition'>+91 9892836690</li>
            <li className='hover:text-primary transition'>samuel@gmail.com</li>
          </ul>
        </div>

        <div>
          <p className='text-lg font-medium mb-3 border-b-2 border-gray-300 inline-block pb-1'>Follow Us</p>
          <div className='flex justify-center gap-4 mt-3'>
            <img className='w-6 cursor-pointer hover:scale-110 transition' src={assets.facebook_icon} alt='Facebook' />
            <img className='w-6 cursor-pointer hover:scale-110 transition' src={assets.twitter_icon} alt='Twitter' />
            <img className='w-6 cursor-pointer hover:scale-110 transition' src={assets.instagram_icon} alt='Instagram' />
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className='mt-12 text-center text-sm text-gray-500'>
        <hr className='mb-4' />
        <p>Copyright 2024 @ sammyjo.com - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;