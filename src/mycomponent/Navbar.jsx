import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const commonItems = [
    { name: "FindFood", href: "/find-food" },
    { name: "ListFood", href: "/list-food" },
  ];

  return (
    <nav className="bg-amber-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Plates4All
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {commonItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="hover:text-amber-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <Link to="/logout" className="hover:text-red-300 transition-colors">
              Logout
            </Link>
          ) : (
            <>
              <Link to="/signup" className="hover:text-amber-300 transition-colors">
                Signup
              </Link>
              <Link to="/login" className="hover:text-amber-300 transition-colors">
                Login
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:hidden px-4 pt-2 pb-4 gap-3 bg-amber-800 rounded-b-md"
          >
            {commonItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                to="/logout"
                onClick={() => setIsOpen(false)}
                className="hover:text-red-300 transition-colors"
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-amber-300 transition-colors"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-amber-300 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
