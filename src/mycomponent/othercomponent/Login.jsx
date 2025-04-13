// login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../Context/Authcontext';



function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthenticates } = useAuth();

  const handleSignin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://plates4all-8.onrender.com/api/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.access) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh); // ✅ this was missing

        alert('Login successful');
        setAuthenticates(true);
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
        setAuthenticates(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.form
        onSubmit={handleSignin}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-900">Sign In</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <button
          type="submit"
          className="w-full bg-amber-900 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors"
        >
          Sign In
        </button>
      </motion.form>
    </div>
  );
}

export default Login;
