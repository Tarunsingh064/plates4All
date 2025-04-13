import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
//import { useAuth } from "../../Context/Authcontext";


function Signup() {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { setIsAuthenticated } = useAuth(); // 👈 use context

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://plates4all-8.onrender.com/api/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
      } else {
        alert("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
        //setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-amber-900 mb-6">
          Create an Account
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          type="submit"
          className="w-full bg-amber-900 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-all"
        >
          Sign Up
        </motion.button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </motion.form>
    </div>
  );
}

export default Signup;


