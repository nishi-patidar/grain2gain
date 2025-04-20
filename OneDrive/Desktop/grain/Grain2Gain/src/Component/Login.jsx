import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulating an API call with a delay
    setTimeout(() => {
      // Simulated successful login check
      if (email === 'user@example.com' && password === 'password123') {
        setIsLoading(false);
        // Redirect to the dashboard on success
        navigate('/dashboard');
      } else {
        setIsLoading(false);
        setError('Invalid email or password');
      }
    }, 1500); // Simulate network delay
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-green-50 via-white to-emerald-50">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl w-full max-w-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Login to Grain2Gain</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading} // Disable button while loading
            className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600'} text-white py-2 rounded-lg font-semibold transition`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account? <a href="/signup" className="text-emerald-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
