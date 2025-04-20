import React, { useState } from 'react';
import axios from 'axios';
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLock,
  FaUniversity,
  FaCity,
  FaClipboardCheck
} from 'react-icons/fa';
import { Link } from 'react-router-dom'; // import Link for navigation

export default function NGOSignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    darpanId: '',
    password: '',
    state: '',
    city: '',
    email: '',
    ngoType: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.values(formData).every((field) => field.trim() !== '');
    if (!isValid) {
      setSuccessMessage('');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/ngo/register', formData);
      console.log('Server response:', response.data);

      setSuccessMessage('🎉 NGO registration successful! Please check your email to verify.');
      setErrorMessage('');

      setFormData({
        name: '',
        darpanId: '',
        password: '',
        state: '',
        city: '',
        email: '',
        ngoType: '',
      });
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      setSuccessMessage('');
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-8 sm:p-10">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-2">NGO Sign-Up</h2>
        <p className="text-center text-gray-500 mb-6">Partner with us to make a difference 🤝</p>

        {successMessage && (
          <div className="mb-4 text-center text-green-700 font-medium bg-green-100 border border-green-300 px-4 py-2 rounded-lg">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-center text-red-600 font-medium bg-red-100 border border-red-300 px-4 py-2 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField icon={<FaUser />} type="text" name="name" placeholder="NGO Name" value={formData.name} onChange={handleChange} />
          <InputField icon={<FaClipboardCheck />} type="text" name="darpanId" placeholder="Darpan ID" value={formData.darpanId} onChange={handleChange} />
          <InputField icon={<FaEnvelope />} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <InputField icon={<FaCity />} type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <InputField icon={<FaUniversity />} type="text" name="ngoType" placeholder="Type of NGO" value={formData.ngoType} onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Sign Up
          </button>

          {/* Already have an account link */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{' '}
            <Link to="/ngosignIn" className="text-green-700 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

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
