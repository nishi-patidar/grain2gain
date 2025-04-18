import React, { useState } from 'react';
// import {apiRequest} from "./utils/apiRequest.js";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSeedling,
  FaLock,
  FaTractor,
} from 'react-icons/fa';

export default function FarmerSignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    farmSize: '',
    produceType: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const isValid = Object.values(formData).every((field) => field.trim() !== '');
    if (!isValid) {
      setSuccessMessage('Please fill in all fields.');
      return;
    }

    console.log('Form submitted:', formData);
    setSuccessMessage('🎉 Sign-up successful! Welcome to Grain2Gain.');

    // Reset form
    setFormData({
      name: '',
      phone: '',
      location: '',
      farmSize: '',
      produceType: '',
      password: '',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-8 sm:p-10">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-2">Farmer Sign-Up</h2>
        <p className="text-center text-gray-500 mb-6">Join Grain2Gain and grow with us 🌾</p>

        {successMessage && (
          <div className="mb-4 text-center text-green-700 font-medium bg-green-100 border border-green-300 px-4 py-2 rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField icon={<FaUser />} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <InputField icon={<FaPhone />} type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <InputField icon={<FaTractor />} type="number" name="farmSize" placeholder="Farm Size (acres)" value={formData.farmSize} onChange={handleChange} />
          <InputField icon={<FaSeedling />} type="text" name="produceType" placeholder="Produce Type" value={formData.produceType} onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

// 💡 Reusable Input Field Component
function InputField({ icon, type, name, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute top-3.5 left-4 text-green-600">{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}

import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await apiRequest.post('/farmer/signup', {
      name,
      email,
      password,
      role: 'Farmer' // or NGO, Retailer
    });

    if (response.data.token) {
      // ✅ Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Optional: Navigate or decode immediately
      navigate('/dashboard'); // or wherever you want to go
    }
  } catch (err) {
    console.error(err);
  }
};
