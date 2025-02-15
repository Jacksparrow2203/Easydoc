import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);
            if (image) formData.append('image', image);
            
            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return userData ? (
        <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
            <div className='flex flex-col items-center gap-4'>
                <label htmlFor='image' className='cursor-pointer'>
                    <div className='relative'>
                        <img className='w-32 h-32 rounded-full object-cover' src={image ? URL.createObjectURL(image) : userData.image} alt='Profile' />
                        {isEdit && <img className='w-8 absolute bottom-0 right-0' src={assets.upload_icon} alt='Upload' />}
                    </div>
                    <input type='file' id='image' hidden onChange={(e) => setImage(e.target.files[0])} />
                </label>
                {isEdit ? (
                    <input className='bg-gray-100 text-xl font-semibold text-center w-full p-2 rounded' type='text' value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                ) : (
                    <p className='text-2xl font-semibold'>{userData.name}</p>
                )}
            </div>

            <div className='mt-6'>
                <h3 className='text-lg font-medium border-b pb-2 mb-3'>Contact Information</h3>
                <div className='space-y-3'>
                    <p><span className='font-medium'>Email:</span> <span className='text-blue-500'>{userData.email}</span></p>
                    <p><span className='font-medium'>Phone:</span> {isEdit ? <input className='bg-gray-100 p-1 rounded' type='text' value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} /> : <span>{userData.phone}</span>}</p>
                    <p><span className='font-medium'>Address:</span> {isEdit ? <input className='bg-gray-100 p-1 rounded w-full' type='text' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} /> : <span>{userData.address.line1}</span>}</p>
                </div>
            </div>
            
            <div className='mt-6'>
                <h3 className='text-lg font-medium border-b pb-2 mb-3'>Basic Information</h3>
                <div className='space-y-3'>
                    <p><span className='font-medium'>Gender:</span> {isEdit ? <select className='bg-gray-100 p-1 rounded' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}><option value='Not Selected'>Not Selected</option><option value='Male'>Male</option><option value='Female'>Female</option></select> : <span>{userData.gender}</span>}</p>
                    <p><span className='font-medium'>Birthday:</span> {isEdit ? <input className='bg-gray-100 p-1 rounded' type='date' value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} /> : <span>{userData.dob}</span>}</p>
                </div>
            </div>
            
            <div className='mt-8 text-center'>
                {isEdit ? <button onClick={updateUserProfileData} className='bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition'>Save Changes</button> : <button onClick={() => setIsEdit(true)} className='bg-gray-200 px-6 py-2 rounded-full hover:bg-gray-300 transition'>Edit Profile</button>}
            </div>
        </div>
    ) : null;
};

export default MyProfile;
