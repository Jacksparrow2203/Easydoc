import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
    const { currency, backendUrl } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            };

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken]);

    return profileData && (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-3xl p-6 transform transition-all hover:scale-105">
                <div className="flex flex-col items-center text-center">
                    <img className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md" src={profileData.image} alt="Doctor" />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-3">{profileData.name}</h2>
                    <p className="text-gray-600">{profileData.degree} - {profileData.speciality}</p>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mt-2">{profileData.experience} years experience</span>
                </div>
                <div className="mt-5 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800">About</h3>
                    {isEdit ? (
                        <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} className="w-full border p-2 rounded mt-2" rows={3} value={profileData.about} />
                    ) : (
                        <p className="text-gray-600 mt-2">{profileData.about}</p>
                    )}
                </div>
                <div className="mt-5 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Details</h3>
                    <p className="text-gray-600 mt-2">Appointment Fee: <span className="font-semibold">{currency} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} className="border p-1 rounded" value={profileData.fees} /> : profileData.fees}</span></p>
                    <p className="text-gray-600 mt-2">Address:
                        {isEdit ? (
                            <>
                                <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} className="border p-1 rounded w-full mt-1" value={profileData.address.line1} />
                                <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} className="border p-1 rounded w-full mt-1" value={profileData.address.line2} />
                            </>
                        ) : (
                            <span> {profileData.address.line1}, {profileData.address.line2}</span>
                        )}
                    </p>
                    <div className="flex items-center mt-3">
                        <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} className="mr-2" />
                        <label className="text-gray-600">Available for Appointments</label>
                    </div>
                </div>
                <div className="mt-5 flex justify-center gap-4">
                    {isEdit ? (
                        <button onClick={updateProfile} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">Save</button>
                    ) : (
                        <button onClick={() => setIsEdit(true)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all">Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;