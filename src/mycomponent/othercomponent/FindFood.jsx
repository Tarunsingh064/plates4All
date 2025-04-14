import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/Authcontext';
import { motion, AnimatePresence } from 'framer-motion';

const FindFood = () => {
  const { isAuthenticated } = useAuth();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    text: '',
    phone_number: '',
    adress: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Get access token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem("access");
    if (!token) return {};
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Fetch all food listings
  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://plates4all-8.onrender.com/api/food/foods/', {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setFoods(data);
      setFilteredFoods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter foods based on search term (phone number)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(food => 
        food.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  }, [searchTerm, foods]);

  useEffect(() => {
    fetchFoods();
  }, [isAuthenticated]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle edit button click
  const handleEdit = (food) => {
    setEditingId(food.id);
    setEditForm({
      text: food.text,
      phone_number: food.phone_number,
      adress: food.adress
    });
  };

  // Handle form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit edited food
  const handleEditSubmit = async (foodId) => {
    try {
      const response = await fetch(`http://plates4all-8.onrender.com/api/food/foods/${foodId}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(editForm)
      });

      if (response.status === 401) {
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        throw new Error(`Failed to update: ${response.status}`);
      }

      const updatedFood = await response.json();
      const updatedFoods = foods.map(food => 
        food.id === foodId ? updatedFood : food
      );
      setFoods(updatedFoods);
      setEditingId(null);
      
      if (searchTerm.trim() !== '') {
        const filtered = updatedFoods.filter(food => 
          food.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoods(filtered);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a food post
  const handleDelete = async (foodId) => {
    if (!window.confirm('Are you sure you want to delete this food post?')) return;
    
    try {
      const response = await fetch(`https://plates4all-8.onrender.com/api/food/foods/${foodId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }

      const updatedFoods = foods.filter(food => food.id !== foodId);
      setFoods(updatedFoods);
      setFilteredFoods(updatedFoods);
    } catch (err) {
      setError(err.message);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-64"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 1.5 }
          }}
          className="text-xl"
        >
          Loading food posts...
        </motion.div>
      </motion.div>
      </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-64 space-y-4"
      >
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-xl text-red-500"
        >
          {error}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchFoods}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Retry
        </motion.button>
      </motion.div>
      </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container px-4 py-8 mx-auto max-w-7xl"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 text-3xl font-bold text-center text-gray-800"
      >
        Available Food Donations
      </motion.h1>

      {/* Search Bar */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by phone number (e.g., +91...)"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {filteredFoods.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredFoods.map(food => (
              <motion.div
                key={food.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                {/* Food Image */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative h-48 overflow-hidden"
                >
                  <img
                    src={food.photo}
                    alt={food.text || 'Food donation'}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                </motion.div>

                {/* Food Details */}
                <div className="p-4">
                  {editingId === food.id ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <motion.input
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        name="text"
                        value={editForm.text}
                        onChange={handleEditChange}
                        placeholder="Food name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <motion.input
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        name="phone_number"
                        value={editForm.phone_number}
                        onChange={handleEditChange}
                        placeholder="Phone number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <motion.input
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        name="adress"
                        value={editForm.adress}
                        onChange={handleEditChange}
                        placeholder="Address"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleEditSubmit(food.id)}
                          className="flex-1 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                          Save
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setEditingId(null)}
                          className="flex-1 px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-2 text-xl font-semibold text-gray-800"
                      >
                        {food.text}
                      </motion.h2>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-3 space-y-1"
                      >
                        <p className="text-gray-600">
                          <span className="font-medium">Donated by:</span> {food.username}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Address:</span> {food.adress}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Contact:</span> {food.phone_number}
                        </p>
                      </motion.div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-500"
                      >
                        Posted on: {formatDate(food.Created_at)}
                      </motion.p>
                      {isAuthenticated && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex mt-4 space-x-2"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(food)}
                            className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(food.id)}
                            className="flex-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </motion.button>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full py-8 text-center"
          >
            <motion.p 
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="text-lg text-gray-500"
            >
              {searchTerm.trim() === '' 
                ? 'No food donations available at the moment.' 
                : 'No matching food donations found.'}
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchFoods}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Refresh
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </main>
    </div>
  );
};

export default FindFood;