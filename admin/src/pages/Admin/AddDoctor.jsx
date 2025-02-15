import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl } = useContext(AppContext);
    const { aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error('Image Not Selected');
            }

            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                setDocImg(false);
                setName('');
                setPassword('');
                setEmail('');
                setAddress1('');
                setAddress2('');
                setDegree('');
                setAbout('');
                setFees('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full flex flex-col items-center'>
            <p className='mb-5 text-2xl font-semibold text-gray-800'>Add New Doctor</p>
            <div className='bg-white p-10 border rounded-lg shadow-lg w-full max-w-3xl animate-fadeIn'>
                <div className='flex flex-col items-center mb-6'>
                    <label htmlFor='doc-img' className='cursor-pointer flex flex-col items-center'>
                        <img className='w-20 h-20 bg-gray-100 rounded-full hover:scale-105 transition-all duration-300' 
                             src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt='' />
                        <p className='text-gray-600 mt-2'>Upload Picture</p>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700'>
                    <div className='flex flex-col gap-2'>
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded-lg px-3 py-2' type='text' placeholder='Name' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded-lg px-3 py-2' type='email' placeholder='Email' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded-lg px-3 py-2' type='password' placeholder='Password' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Experience</p>
                        <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded-lg px-2 py-2'>
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Fees</p>
                        <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded-lg px-3 py-2' type='number' placeholder='Doctor fees' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Speciality</p>
                        <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded-lg px-2 py-2'>
                            {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, index) => (
                                <option key={index} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex flex-col gap-4 mt-4'>
                    <p>Degree</p>
                    <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded-lg px-3 py-2' type='text' placeholder='Degree' required />
                    <p>Address</p>
                    <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded-lg px-3 py-2' type='text' placeholder='Address 1' required />
                    <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded-lg px-3 py-2' type='text' placeholder='Address 2' required />
                </div>
                
                <button type='submit' className='bg-primary px-10 py-3 mt-6 text-white rounded-full hover:scale-105 transition-transform duration-300'>Add Doctor</button>
            </div>
        </form>
    );
};

export default AddDoctor;
