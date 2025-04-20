import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaLock,
} from 'react-icons/fa';

export default function RetailerSignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.values(formData).every((field) => field.trim() !== '');
    if (!isValid) {
      setErrorMessage('Please fill in all fields.');
      setSuccessMessage('');
      return;
    }

    console.log('Retailer Sign-in submitted:', formData);
    setSuccessMessage('🎉 Sign-in successful! Welcome back to Grain2Gain.');
    setErrorMessage('');

    // Navigate to dashboard after successful login
    navigate("/retailerDashboard");

    setFormData({
      email: '',
      password: '',
    });
  };

  const goToSignUp = () => {
    navigate('/retailerSignUp');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-50 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 sm:p-10">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-2">Retailer Sign-In</h2>
        <p className="text-center text-gray-500 mb-6">Welcome back to Grain2Gain 🌾</p>

        {successMessage && (
          <div className="mb-4 text-center text-green-700 font-medium bg-green-100 border border-green-300 px-4 py-2 rounded-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 text-center text-red-700 font-medium bg-red-100 border border-red-300 px-4 py-2 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField 
            icon={<FaEnvelope />} 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          <InputField 
            icon={<FaLock />} 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account yet?</p>
          <button 
            onClick={goToSignUp}
            className="mt-2 text-green-600 hover:text-green-800 font-medium"
          >
            Sign Up as a Retailer
          </button>
        </div>
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