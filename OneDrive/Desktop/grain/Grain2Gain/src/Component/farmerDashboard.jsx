import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const FarmerDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [surplus, setSurplus] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [forecast, setForecast] = useState('');
  const [loading, setLoading] = useState({
    inventory: true,
    surplus: true,
    opportunities: true,
    forecast: true,
  });

  const farmerId = sessionStorage.getItem('farmerId');

  const [surplusForm, setSurplusForm] = useState({
    name: '',
    quantity: '',
    reason: 'Overproduction',
    farmerId: farmerId,
  });

  const [inventoryForm, setInventoryForm] = useState({
    name: '',
    quantity: '',
    status: 'Harvested',
    farmerId: farmerId,
  });

  const [isEditingInventory, setIsEditingInventory] = useState(false);
  const [editingInventoryId, setEditingInventoryId] = useState(null);

  useEffect(() => {
    loadInventory();
    loadSurplus();
    loadOpportunities();
    loadForecast();
  }, []);

  const loadInventory = async () => {
    try {
      const response = await axios.get(`${API_URL}/inventory?farmerId=${farmerId}`);
      setInventory(response.data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading((prev) => ({ ...prev, inventory: false }));
    }
  };

  const loadSurplus = async () => {
    try {
      const response = await axios.get(`${API_URL}/surplus?farmerId=${farmerId}`);
      setSurplus(response.data);
    } catch (error) {
      console.error('Error loading surplus:', error);
    } finally {
      setLoading((prev) => ({ ...prev, surplus: false }));
    }
  };

  const loadOpportunities = async () => {
    try {
      const response = await axios.get(`${API_URL}/opportunities`);
      setOpportunities(response.data);
    } catch (error) {
      console.error('Error loading opportunities:', error);
    } finally {
      setLoading((prev) => ({ ...prev, opportunities: false }));
    }
  };

  const loadForecast = async () => {
    try {
      const response = await axios.get(`${API_URL}/forecasts/random`);
      setForecast(response.data.insight);
    } catch (error) {
      console.error('Error loading forecast:', error);
    } finally {
      setLoading((prev) => ({ ...prev, forecast: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurplusForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInventoryInputChange = (e) => {
    const { name, value } = e.target;
    setInventoryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReportSurplus = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/surplus`, { ...surplusForm, farmerId });
      alert('Surplus reported successfully!');
      setSurplusForm({
        name: '',
        quantity: '',
        reason: 'Overproduction',
        farmerId,
      });
      loadSurplus();
    } catch (error) {
      console.error('Error reporting surplus:', error);
      alert('There was an error reporting the surplus.');
    }
  };

  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to add inventory
      const response = await axios.post(`${API_URL}/inventory`, { ...inventoryForm, farmerId });
      
      // Get the newly created item from the response
      const newItem = response.data;
      
      // Update the local inventory state by adding the new item
      setInventory(prevInventory => [...prevInventory, newItem]);
      
      // Show success message
      alert('Inventory item added successfully!');
      
      // Reset the form
      setInventoryForm({
        name: '',
        quantity: '',
        status: 'Harvested',
        farmerId,
      });
      
      // Hide the form after successful addition
      setIsEditingInventory(false);
      
    } catch (error) {
      console.error('Error adding inventory:', error);
      alert('There was an error adding the inventory item.');
    }
  };

  const handleUpdateInventory = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to update inventory
      const response = await axios.put(`${API_URL}/inventory/${editingInventoryId}`, inventoryForm);
      
      // Get the updated item from the response
      const updatedItem = response.data;
      
      // Update the local inventory state by replacing the updated item
      setInventory(prevInventory => 
        prevInventory.map(item => 
          item._id === editingInventoryId ? updatedItem : item
        )
      );
      
      // Show success message
      alert('Inventory updated successfully!');
      
      // Reset the form and editing state
      setInventoryForm({
        name: '',
        quantity: '',
        status: 'Harvested',
        farmerId,
      });
      setIsEditingInventory(false);
      setEditingInventoryId(null);
      
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('There was an error updating the inventory item.');
    }
  };

  const handleDeleteInventory = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      try {
        // Make the API call to delete the item
        await axios.delete(`${API_URL}/inventory/${id}`);
        
        // Update the local inventory state by removing the deleted item
        setInventory(prevInventory => 
          prevInventory.filter(item => item._id !== id)
        );
        
        // Show success message
        alert('Inventory item deleted successfully!');
        
      } catch (error) {
        console.error('Error deleting inventory:', error);
        alert('There was an error deleting the inventory item.');
      }
    }
  };

  const startEditingInventory = (item) => {
    setInventoryForm({
      name: item.name,
      quantity: item.quantity,
      status: item.status,
      farmerId,
    });
    setIsEditingInventory(true);
    setEditingInventoryId(item._id);
  };

  const cancelEditingInventory = () => {
    setInventoryForm({
      name: '',
      quantity: '',
      status: 'Harvested',
      farmerId,
    });
    setIsEditingInventory(false);
    setEditingInventoryId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 font-sans text-gray-800">
      <header className="bg-green-800 text-white shadow-md py-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">Farmer Dashboard</h1>
        <p className="text-green-200 mt-1 text-sm">Empowering your harvest decisions</p>
      </header>

      <main className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <DashboardCard title="Current Inventory" loading={loading.inventory}>
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-green-700">Items in Stock</h3>
            <button
              onClick={() => setIsEditingInventory(!isEditingInventory)}
              className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors"
            >
              {isEditingInventory ? 'Cancel' : 'Add New Item'}
            </button>
          </div>

          {inventory.length > 0 ? (
            <div className="space-y-3">
              {inventory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <ListItem label={item.name} value={item.quantity} extra={item.status} />
                  <div className="flex space-x-2 ml-2">
                    <button onClick={() => startEditingInventory(item)} className="text-blue-600 hover:text-blue-800" title="Edit">✏️</button>
                    <button onClick={() => handleDeleteInventory(item._id)} className="text-red-600 hover:text-red-800" title="Delete">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No inventory data available.</p>
          )}

          {isEditingInventory && (
            <form onSubmit={editingInventoryId ? handleUpdateInventory : handleAddInventory} className="mt-6 space-y-4 bg-green-50 p-4 rounded-xl shadow-inner">
              <h3 className="font-semibold text-green-700">{editingInventoryId ? 'Update Inventory Item' : 'Add New Inventory Item'}</h3>

              <input type="text" name="name" value={inventoryForm.name} onChange={handleInventoryInputChange} placeholder="Product Name" required className="w-full px-3 py-2 border border-green-300 rounded-md" />
              <input type="number" name="quantity" value={inventoryForm.quantity} onChange={handleInventoryInputChange} placeholder="Quantity (kg)" required min="1" className="w-full px-3 py-2 border border-green-300 rounded-md" />

              <select name="status" value={inventoryForm.status} onChange={handleInventoryInputChange} className="w-full px-3 py-2 border border-green-300 rounded-md" required>
                <option value="Harvested">Harvested</option>
                <option value="Growing">Growing</option>
                <option value="Processing">Processing</option>
              </select>

              <div className="flex gap-2">
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                  {editingInventoryId ? 'Update Item' : 'Add Item'}
                </button>
                {editingInventoryId && (
                  <button type="button" onClick={cancelEditingInventory} className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </DashboardCard>

        <DashboardCard title="Surplus Food" loading={loading.surplus}>
          {surplus.length > 0 ? surplus.map((item, index) => (
            <ListItem key={index} label={item.name} value={item.quantity} extra={item.reason} />
          )) : <p>No surplus currently reported.</p>}

          <form onSubmit={handleReportSurplus} className="mt-6 space-y-4 bg-green-50 p-4 rounded-xl shadow-inner">
            <h3 className="font-semibold text-green-700">Report Surplus</h3>
            <input type="text" name="name" value={surplusForm.name} onChange={handleInputChange} placeholder="Product Name" required className="w-full px-3 py-2 border border-green-300 rounded-md" />
            <input type="number" name="quantity" value={surplusForm.quantity} onChange={handleInputChange} placeholder="Quantity (kg)" min="1" required className="w-full px-3 py-2 border border-green-300 rounded-md" />
            <select name="reason" value={surplusForm.reason} onChange={handleInputChange} required className="w-full px-3 py-2 border border-green-300 rounded-md">
              <option value="Overproduction">Overproduction</option>
              <option value="Quality Standards">Quality Standards</option>
              <option value="Market Price Too Low">Market Price Too Low</option>
              <option value="Storage Constraints">Storage Constraints</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">Submit</button>
          </form>
        </DashboardCard>

        <DashboardCard title="Redistribution Opportunities" loading={loading.opportunities}>
          {opportunities.length > 0 ? opportunities.map((opp, index) => (
            <ListItem key={index} label={opp.org} value={`Needs ${opp.needs}`} extra={opp.distance} />
          )) : <p>No opportunities currently available.</p>}
        </DashboardCard>

        <DashboardCard title="Demand Insights" loading={loading.forecast}>
          <p className="text-sm italic text-yellow-800">{forecast}</p>
        </DashboardCard>
      </main>

      <footer className="bg-white py-6 text-center text-sm text-gray-500 border-t">
        <p>Grain2Gain &copy; 2024. Empowering Sustainable Agriculture.</p>
      </footer>
    </div>
  );
};

const DashboardCard = ({ title, children, loading }) => (
  <section className="bg-white rounded-2xl shadow-md p-6 transition-transform hover:scale-[1.02]">
    <h2 className="text-xl font-bold text-green-800 border-b border-green-300 pb-2 mb-4">{title}</h2>
    {loading ? (
      <p className="animate-pulse text-green-600">Loading...</p>
    ) : (
      <div className="space-y-3">{children}</div>
    )}
  </section>
);

const ListItem = ({ label, value, extra }) => (
  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500 hover:bg-green-100 transition-colors flex-1">
    <div className="font-semibold">{label}</div>
    <div className="text-sm text-gray-700">Quantity: {value}</div>
    {extra && <div className="text-xs text-gray-500">{extra}</div>}
  </div>
);

export default FarmerDashboard;