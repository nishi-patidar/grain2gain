import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Plus, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const NGODashboard = () => {
  // Initialize requestedMaterials as an empty array explicitly
  const [requestedMaterials, setRequestedMaterials] = useState([]);
  const [newRequest, setNewRequest] = useState({ material: '', quantity: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Calculate totalQuantity safely with a check to ensure we're working with an array
  const totalQuantity = Array.isArray(requestedMaterials) 
    ? requestedMaterials.reduce((sum, req) => sum + (parseInt(req.quantity) || 0), 0)
    : 0;

  // Fetch all requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/ngo-dashboard/requests');
      // Ensure we're setting an array
      setRequestedMaterials(Array.isArray(response.data) ? response.data : []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load material requests');
      setIsLoading(false);
      // Set to empty array on error to prevent further issues
      setRequestedMaterials([]);
    }
  };

  const handleAddRequest = async () => {
    if (!newRequest.material.trim() || !newRequest.quantity || parseInt(newRequest.quantity) <= 0) {
      toast.error('Please enter a valid material and quantity.');
      return;
    }

    const requestData = {
      material: newRequest.material.trim(),
      quantity: parseInt(newRequest.quantity),
      // Status will be set to 'Pending' by default in the backend
    };

    try {
      const response = await axios.post('/ngo-dashboard/request', requestData);
      
      // Add the new request to the state with the ID from the backend
      setRequestedMaterials([...requestedMaterials, response.data]);
      
      // Reset form and close modal
      setNewRequest({ material: '', quantity: '' });
      setIsModalOpen(false);
      toast.success('Material request submitted!');
    } catch (error) {
      console.error('Error creating request:', error);
      toast.error('Failed to submit request. Please try again.');
    }
  };

  const filteredMaterials = Array.isArray(requestedMaterials)
    ? requestedMaterials.filter(req =>
        req.material.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-100">
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-700">🌾 NGO Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Requests</h3>
            <p className="text-4xl font-bold text-green-600">{Array.isArray(requestedMaterials) ? requestedMaterials.length : 0}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Quantity Requested</h3>
            <p className="text-4xl font-bold text-green-600">{totalQuantity} kg</p>
          </div>
        </div>

        {/* Requests Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-green-800">Requested Materials</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center transition"
            >
              <Plus className="w-5 h-5 mr-1" />
              New Request
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search material..."
              className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Materials Table */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Quantity (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500">Loading requests...</td>
                  </tr>
                ) : filteredMaterials.length > 0 ? (
                  filteredMaterials.map(req => (
                    <tr key={req._id || req.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{req.material}</td>
                      <td className="px-6 py-4">{req.quantity}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            req.status === 'Approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-600'
                          }`}
                        >
                          {req.status === 'Approved' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500">No matching materials found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-green-800">Request New Material</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Wheat Straw"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={newRequest.material}
                    onChange={e => setNewRequest({ ...newRequest, material: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="1"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={newRequest.quantity}
                    onChange={e => setNewRequest({ ...newRequest, quantity: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                    onClick={handleAddRequest}
                  >
                    Request
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NGODashboard;