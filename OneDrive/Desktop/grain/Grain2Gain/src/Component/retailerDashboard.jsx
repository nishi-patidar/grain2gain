import { useState, useEffect } from 'react';
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar } from 'recharts';

export default function FoodWasteDashboard() {
  // State management
  const [mySurplusListings, setMySurplusListings] = useState([]);
  const [availableSurplus, setAvailableSurplus] = useState([
    { id: 'f1', source: 'farmer', name: 'Organic Tomatoes', quantity: 50, unit: 'kg', expiry: '2024-08-10', condition: 'Good', price: 1.50, ngo: false, pickup: 'Green Valley Farms, Dock 2' },
    { id: 'r1', source: 'retailer', name: 'Whole Wheat Bread', quantity: 20, unit: 'items', expiry: '2024-08-05', condition: 'Excellent', price: 0.50, ngo: false, pickup: 'Local Mart, Back Entrance' },
    { id: 'f2', source: 'farmer', name: 'Surplus Zucchini', quantity: 100, unit: 'kg', expiry: '2024-08-08', condition: 'Good', price: 0.00, ngo: true, pickup: 'Sunny Acres, Call 555-1234' },
    { id: 'f3', source: 'farmer', name: 'Apples', quantity: 200, unit: 'kg', expiry: '2024-08-15', condition: 'Fair', price: 0.20, ngo: false, pickup: 'Orchard Grove, Gate B' }
  ]);
  const [stats, setStats] = useState({
    listed: 0,
    redistributed: 0,
    savings: 0,
    reduction: 0
  });
  const [filters, setFilters] = useState({
    type: '',
    source: '',
    ngoOnly: false
  });
  const [filteredSurplus, setFilteredSurplus] = useState([]);
  
  // Chart Data
  const chartData = [
    { name: 'Apples', stock: 180, demand: 150 },
    { name: 'Bread', stock: 70, demand: 80 },
    { name: 'Tomatoes', stock: 110, demand: 120 },
    { name: 'Milk', stock: 250, demand: 200 },
    { name: 'Chicken', stock: 100, demand: 90 }
  ];
  
  // Calculate chart insights
  const surplusItems = chartData
    .filter(item => item.stock - item.demand > 20)
    .map(item => item.name);
  
  // Effect to update stats when listings change
  useEffect(() => {
    updateStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySurplusListings]);
  
  // Effect to apply filters
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, availableSurplus]);
  
  // Functions
  const updateStats = () => {
    setStats({
      listed: mySurplusListings.length,
      redistributed: Math.floor(mySurplusListings.length * 0.3), // Mock 30% redistribution
      savings: mySurplusListings.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      reduction: Math.min(15 + mySurplusListings.length * 2, 100) // Mock reduction
    });
  };
  
  const applyFilters = () => {
    const filtered = availableSurplus.filter(item => {
      const nameMatch = !filters.type || item.name.toLowerCase().includes(filters.type.toLowerCase());
      const sourceMatch = !filters.source || item.source === filters.source;
      const ngoMatch = !filters.ngoOnly || item.ngo === true;
      return nameMatch && sourceMatch && ngoMatch;
    });
    setFilteredSurplus(filtered);
  };
  
  const handleAddSurplus = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newItem = {
      id: `my${Date.now()}`, // Simple unique ID
      source: 'retailer', // Assuming retailer's dashboard
      name: formData.get('item-name'),
      quantity: parseFloat(formData.get('quantity')),
      unit: formData.get('unit'),
      expiry: formData.get('expiry-date'),
      condition: formData.get('condition'),
      price: parseFloat(formData.get('price')),
      ngo: formData.get('donate-ngo') === 'on',
      pickup: formData.get('pickup-details')
    };
    
    setMySurplusListings(prev => [...prev, newItem]);
    e.target.reset();
  };
  
  const removeMyListing = (id) => {
    setMySurplusListings(prev => prev.filter(item => item.id !== id));
  };
  
  const claimItem = (id) => {
    const item = availableSurplus.find(item => item.id === id);
    if (item) {
      // In a real app, this would interact with a backend
      alert(`Item ${item.name} claimed/requested! (Simulation)`);
      
      // Mark as claimed in UI
      setAvailableSurplus(prev => prev.map(i => 
        i.id === id ? {...i, claimed: true} : i
      ));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Retailer Dashboard</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#overview" className="font-bold hover:text-green-100">Overview</a></li>
            <li><a href="#add-surplus" className="font-bold hover:text-green-100">List Surplus</a></li>
            <li><a href="#available-surplus" className="font-bold hover:text-green-100">Available Surplus</a></li>
            <li><a href="#forecasting" className="font-bold hover:text-green-100">Demand Forecast</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto p-6 w-full">
        {/* Overview Section */}
        <section id="overview" className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-green-700 text-xl font-bold border-b pb-2 mb-4">Overview & Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
              <h3 className="text-green-700 text-sm mb-2">Items Listed</h3>
              <p className="text-green-900 text-2xl font-bold">{stats.listed}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
              <h3 className="text-green-700 text-sm mb-2">Items Redistributed</h3>
              <p className="text-green-900 text-2xl font-bold">{stats.redistributed}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
              <h3 className="text-green-700 text-sm mb-2">Potential Savings</h3>
              <p className="text-green-900 text-2xl font-bold">${stats.savings.toFixed(2)}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
              <h3 className="text-green-700 text-sm mb-2">Waste Reduction</h3>
              <p className="text-green-900 text-2xl font-bold">{stats.reduction}%</p>
            </div>
          </div>
        </section>

        {/* Add Surplus Form Section */}
        <section id="add-surplus" className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-green-700 text-xl font-bold border-b pb-2 mb-4">List New Surplus Food</h2>
          <form onSubmit={handleAddSurplus} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col">
              <label htmlFor="item-name" className="text-gray-700 font-semibold mb-1 text-sm">Item Name:</label>
              <input type="text" id="item-name" name="item-name" required 
                className="border border-gray-300 rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity" className="text-gray-700 font-semibold mb-1 text-sm">Quantity:</label>
              <input type="number" id="quantity" name="quantity" required min="1" 
                className="border border-gray-300 rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="unit" className="text-gray-700 font-semibold mb-1 text-sm">Unit:</label>
              <select id="unit" name="unit" required 
                className="border border-gray-300 rounded p-2">
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
                <option value="items">items</option>
                <option value="bunches">bunches</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="expiry-date" className="text-gray-700 font-semibold mb-1 text-sm">Expiry Date:</label>
              <input type="date" id="expiry-date" name="expiry-date" required 
                className="border border-gray-300 rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="condition" className="text-gray-700 font-semibold mb-1 text-sm">Condition:</label>
              <select id="condition" name="condition" required 
                className="border border-gray-300 rounded p-2">
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="text-gray-700 font-semibold mb-1 text-sm">Price (per unit, 0 for donation):</label>
              <input type="number" id="price" name="price" required min="0" step="0.01" 
                className="border border-gray-300 rounded p-2" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="pickup-details" className="text-gray-700 font-semibold mb-1 text-sm">Pickup Details:</label>
              <textarea id="pickup-details" name="pickup-details" rows="2" 
                className="border border-gray-300 rounded p-2"></textarea>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="donate-ngo" name="donate-ngo" className="mr-2" />
              <label htmlFor="donate-ngo" className="text-gray-700 font-semibold text-sm">Prioritize NGO Donation</label>
            </div>
            <div className="col-span-1 md:col-span-3">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
                List Item
              </button>
            </div>
          </form>
          
          <div>
            <h3 className="text-green-600 text-lg font-semibold mt-6 mb-3 border-b pb-1">My Current Listings</h3>
            <ul className="space-y-4">
              {mySurplusListings.length === 0 ? (
                <li className="text-gray-500">No items listed yet.</li>
              ) : (
                mySurplusListings.map(item => (
                  <li key={item.id} className="bg-gray-50 border border-gray-200 border-l-4 border-l-red-500 rounded p-4 flex justify-between items-center flex-wrap gap-2">
                    <div className="flex-grow">
                      <span className="inline-block mr-4 text-sm"><strong>Item:</strong> {item.name}</span>
                      <span className="inline-block mr-4 text-sm"><strong>Qty:</strong> {item.quantity} {item.unit}</span>
                      <span className="inline-block mr-4 text-sm"><strong>Expires:</strong> {item.expiry}</span>
                      <span className="inline-block mr-4 text-sm"><strong>Condition:</strong> {item.condition}</span>
                      <span className="inline-block mr-4 text-sm"><strong>Price:</strong> ${item.price.toFixed(2)}{item.price === 0 ? ' (Donation)' : ''}</span>
                      {item.ngo && <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded-full">NGO Priority</span>}
                      <br />
                      <span className="inline-block text-sm mt-2"><strong>Pickup:</strong> {item.pickup || 'Not specified'}</span>
                    </div>
                    <button 
                      onClick={() => removeMyListing(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                      Remove
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        {/* Available Surplus Section */}
        <section id="available-surplus" className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-green-700 text-xl font-bold border-b pb-2 mb-4">Available Surplus Food</h2>
          
          <div className="bg-green-50 p-4 rounded flex flex-wrap items-center gap-3 mb-6">
            <div>
              <label htmlFor="filter-type" className="text-sm font-semibold mr-2">Item Type:</label>
              <input 
                type="text" 
                id="filter-type" 
                placeholder="e.g., Apples" 
                className="border border-gray-300 rounded p-1 text-sm"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="filter-source" className="text-sm font-semibold mr-2">Source:</label>
              <select 
                id="filter-source" 
                className="border border-gray-300 rounded p-1 text-sm"
                value={filters.source}
                onChange={(e) => setFilters({...filters, source: e.target.value})}
              >
                <option value="">All Sources</option>
                <option value="farmer">Farmers</option>
                <option value="retailer">Other Retailers</option>
              </select>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="filter-ngo" 
                className="mr-1"
                checked={filters.ngoOnly}
                onChange={(e) => setFilters({...filters, ngoOnly: e.target.checked})}
              />
              <label htmlFor="filter-ngo" className="text-sm font-semibold">NGO Donations Only</label>
            </div>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              onClick={() => applyFilters()}
            >
              Apply Filters
            </button>
          </div>
          
          <ul className="space-y-4">
            {filteredSurplus.length === 0 ? (
              <li className="text-gray-500">No available items match filters.</li>
            ) : (
              filteredSurplus.map(item => (
                <li key={item.id} className="bg-gray-50 border border-gray-200 border-l-4 border-l-blue-500 rounded p-4 flex justify-between items-center flex-wrap gap-2">
                  <div className="flex-grow">
                    <span className="inline-block mr-4 text-sm"><strong>Item:</strong> {item.name}</span>
                    <span className="inline-block mr-4 text-sm"><strong>Qty:</strong> {item.quantity} {item.unit}</span>
                    <span className="inline-block mr-4 text-sm"><strong>Expires:</strong> {item.expiry}</span>
                    <span className="inline-block mr-4 text-sm"><strong>Condition:</strong> {item.condition}</span>
                    <span className="inline-block mr-4 text-sm"><strong>Price:</strong> ${item.price.toFixed(2)}{item.price === 0 ? ' (Donation)' : ''}</span>
                    <span className="inline-block mr-4 text-sm"><strong>Source:</strong> {item.source === 'farmer' ? 'Farmer' : 'Retailer'}</span>
                    {item.ngo && <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded-full">NGO Priority</span>}
                    <br />
                    <span className="inline-block text-sm mt-2"><strong>Pickup:</strong> {item.pickup || 'Not specified'}</span>
                  </div>
                  <button 
                    onClick={() => claimItem(item.id)}
                    disabled={item.claimed}
                    className={`${item.claimed 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600'} text-white px-3 py-1 rounded text-sm`}
                  >
                    {item.claimed ? 'Claimed' : (item.price === 0 ? 'Claim Donation' : 'Buy Item')}
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* Forecasting Section */}
        <section id="forecasting" className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-green-700 text-xl font-bold border-b pb-2 mb-4">AI Demand Forecasting</h2>
          <p className="mb-4">Predicted demand vs. current stock for key items.</p>
          
          <div className="max-w-2xl mx-auto">
            {/* Implementing proper chart with Recharts */}
            <div className="mb-8">
              <BarChart
                width={600}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" name="Current Stock" fill="#82ca9d" />
                <Bar dataKey="demand" name="Predicted Demand" fill="#8884d8" />
              </BarChart>
            </div>
            
            {/* Table visualization as backup or supplement */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-200 p-2 text-left">Product</th>
                    <th className="border border-blue-200 p-2 text-left">Current Stock</th>
                    <th className="border border-blue-200 p-2 text-left">Predicted Demand</th>
                    <th className="border border-blue-200 p-2 text-left">Surplus/Shortfall</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item, index) => {
                    const diff = item.stock - item.demand;
                    const status = diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-blue-600';
                    
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-200 p-2">{item.name}</td>
                        <td className="border border-gray-200 p-2">{item.stock}</td>
                        <td className="border border-gray-200 p-2">{item.demand}</td>
                        <td className={`border border-gray-200 p-2 font-medium ${status}`}>
                          {diff > 0 ? `+${diff}` : diff}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-500 p-4 rounded mt-6">
            <p>
              <strong className="text-blue-600">Insight:</strong> {
                surplusItems.length > 0 
                  ? `Potential surplus of ${surplusItems.join(', ')} expected. Consider promotions or listing surplus early.`
                  : 'Stock levels generally align with predicted demand.'
              }
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 p-4 text-center mt-8">
        <p>&copy; 2024 Food Waste Management System</p>
      </footer>
    </div>
  );
}   