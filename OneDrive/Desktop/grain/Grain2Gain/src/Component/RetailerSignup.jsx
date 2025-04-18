import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStore,
  FaBoxOpen,
  FaLock,
} from 'react-icons/fa';

export default function RetailerSignUpPage() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    businessType: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.values(formData).every((field) => field.trim() !== '');
    if (!isValid) {
      setSuccessMessage('Please fill in all fields.');
      return;
    }

    console.log('Retailer Form submitted:', formData);
    setSuccessMessage('🎉 Retailer registration successful! Welcome to Grain2Gain.');

    setFormData({
      storeName: '',
      contactPerson: '',
      email: '',
      phone: '',
      location: '',
      businessType: '',
      password: '',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-8 sm:p-10">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-2">Retailer Sign-Up</h2>
        <p className="text-center text-gray-500 mb-6">Partner with Grain2Gain and stock fresh organic goods 🛒</p>

        {successMessage && (
          <div className="mb-4 text-center text-green-700 font-medium bg-green-100 border border-green-300 px-4 py-2 rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField icon={<FaStore />} type="text" name="storeName" placeholder="Store Name" value={formData.storeName} onChange={handleChange} />
          <InputField icon={<FaUser />} type="text" name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} onChange={handleChange} />
          <InputField icon={<FaEnvelope />} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <InputField icon={<FaPhone />} type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <InputField icon={<FaBoxOpen />} type="text" name="businessType" placeholder="Business Type (e.g., Grocery, Supermarket)" value={formData.businessType} onChange={handleChange} />
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
