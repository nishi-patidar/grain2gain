import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaLock } from 'react-icons/fa';

export default function FarmerSignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    state: '',
    city: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    const isValid = Object.values(formData).every((field) => field.trim() !== '');
    if (!isValid) {
      setSuccessMessage('');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/farmer/register', formData);

      if (response.data.message) {
        setSuccessMessage('🎉 Farmer registration successful! OTP sent to email.');
        setErrorMessage('');
        setShowOtpModal(true); // Show OTP modal
      }
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      setSuccessMessage('');
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/farmer/verify-otp', { email: formData.email, otp });

      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setOtpError('');
        setShowOtpModal(false); // Close OTP modal after successful verification
      }
    } catch (error) {
      console.error('Error during OTP verification:', error.response?.data || error.message);
      setOtpError(error.response?.data?.message || 'Invalid or expired OTP.');
    }
  };

  const redirectToLogin = () => {
    navigate('/farmerlogin');
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
        {errorMessage && (
          <div className="mb-4 text-center text-red-600 font-medium bg-red-100 border border-red-300 px-4 py-2 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField icon={<FaUser />} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <InputField icon={<FaEnvelope />} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <InputField icon={<FaMapMarkerAlt />} type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <InputField icon={<FaLock />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <button
              type="button"
              onClick={redirectToLogin}
              className="mt-2 w-full bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-medium py-2.5 rounded-xl transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold text-center text-green-800 mb-4">Verify OTP</h2>

            {otpError && (
              <div className="mb-4 text-center text-red-600 font-medium bg-red-100 border border-red-300 px-4 py-2 rounded-lg">
                {otpError}
              </div>
            )}

            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                  className="pl-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200"
              >
                Verify OTP
              </button>
            </form>

            <button
              onClick={() => setShowOtpModal(false)}
              className="mt-4 w-full text-center text-gray-500 hover:text-green-600 font-medium py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
